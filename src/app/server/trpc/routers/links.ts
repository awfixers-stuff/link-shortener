import z from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { link } from "@/lib/db/schema";

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
      const [created] = await db
        .insert(link)
        .values({ key, destination, createdById, status: "online" })
        .returning();
      return created;
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
