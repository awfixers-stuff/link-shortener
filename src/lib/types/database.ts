import * as Schema from "@/lib/db/schema";

export type LinksTable = typeof Schema.link.$inferSelect;
export type UsersTable = typeof Schema.user.$inferSelect;
export type AccountsTable = typeof Schema.account.$inferSelect;
export type SessionsTable = typeof Schema.session.$inferSelect;
export type VerificationsTable = typeof Schema.verification.$inferSelect;
