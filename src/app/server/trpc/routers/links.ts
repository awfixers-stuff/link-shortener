import z from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { link } from "@/lib/db/schema";
import { user as userTable } from "@/lib/db/schema/auth";
import { getUserLimits } from "@/lib/access-control";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const linksRouter = createTRPCRouter({
  getLinksByUserId: baseProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number().optional(),
        offset: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { userId, limit = 10, offset = 0 } = input;

      const data = await db.query.link.findMany({
        where: eq(link.createdById, userId),
        limit,
        offset,
      });

      if (!data) {
        return null;
      }

      return {
        links: data,
      };
    }),
  createLink: baseProcedure
    .input(
      z.object({
        key: z.string().min(1),
        destination: z.string().url(),
        createdById: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { key, destination, createdById } = input;
      // Check for duplicate key
      const existing = await db.query.link.findFirst({
        where: eq(link.key, key),
      });
      if (existing) {
        throw new Error(
          "A link with this slug already exists. Please choose another.",
        );
      }
      // Check user link limit using getUserLimits
      const userRecord = await db.query.user.findFirst({
        where: eq(userTable.id, createdById),
      });

      if (!userRecord) {
        throw new Error(
          "You're account doesn't exist, please create a new account.",
        );
      }

      const { links: linkLimit } = await getUserLimits();
      const userLinksCount = userRecord.links ?? 0;
      if (userLinksCount >= linkLimit) {
        throw new Error(
          "You have reached your link limit. Upgrade your plan or delete a link to create a new one.",
        );
      }

      const [created] = await db
        .insert(link)
        .values({ key, destination, createdById, status: "online" })
        .returning();
      // Increment user's link count
      if (userRecord) {
        await db
          .update(userTable)
          .set({ links: userLinksCount + 1 })
          .where(eq(userTable.id, createdById));
        await auth.api.updateUser({
          headers: await headers(),
          body: { image: userRecord.image! },
        });
      }

      return created;
    }),
  deleteLink: baseProcedure
    .input(
      z.object({
        key: z.string().min(1),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { key, userId } = input;
      // Find the link and ensure it belongs to the user
      const existing = await db.query.link.findFirst({
        where: eq(link.key, key),
      });
      if (!existing) {
        throw new Error("Link not found.");
      }
      if (existing.createdById !== userId) {
        throw new Error("You do not have permission to delete this link.");
      }
      // Delete the link
      await db.delete(link).where(eq(link.key, key));
      // Decrement user's link count
      const userRecord = await db.query.user.findFirst({
        where: eq(userTable.id, userId),
      });
      if (userRecord) {
        const newLinksCount = Math.max((userRecord.links ?? 1) - 1, 0);
        await db
          .update(userTable)
          .set({ links: newLinksCount })
          .where(eq(userTable.id, userId));
        await auth.api.updateUser({
          headers: await headers(),
          body: { image: userRecord.image! },
        });
      }
      return { success: true };
    }),
  getAllLinks: baseProcedure
    .input(
      z
        .object({
          limit: z.number().optional(),
          offset: z.number().optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const { limit = 20, offset = 0 } = input ?? {};
      const data = await db.query.link.findMany({
        where: eq(link.status, "online"),
        limit,
        offset,
        orderBy: (links, { desc }) => desc(links.createdAt),
      });
      return data.map((l) => ({
        key: l.key,
        destination: l.destination,
        createdAt: l.createdAt,
      }));
    }),
});
