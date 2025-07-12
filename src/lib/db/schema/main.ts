import {
  pgTable,
  uuid,
  text,
  integer,
  uniqueIndex,
  index,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const linkStatus = pgEnum("link_status", ["online", "offline"]);

export const link = pgTable(
  "link",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    key: text("key").notNull(),
    destination: text("destination").notNull(),
    visits: integer("visits").default(0),
    status: linkStatus("status").default("online"),
    createdById: text("created_by_id").references(() => user.id, {
      onDelete: "cascade",
    }),
    createdAt: date("created_at").defaultNow(),
  },
  (t) => [
    uniqueIndex("link_key_idx").using("btree", t.key),
    index("link_visits_idx").using("btree", t.visits),
    index("link_created_by_id_idx").using("btree", t.createdById),
    index("link_created_at_idx").using("btree", t.createdAt),
  ],
);
