import { relations } from "drizzle-orm";
import { user } from "./auth";
import { link } from "./main";

export const userRelations = relations(user, ({ many }) => ({
  links: many(link),
}));

export const linkRelations = relations(link, ({ one }) => ({
  owner: one(user, {
    fields: [link.createdById],
    references: [user.id],
    relationName: "owner",
  }),
}));
