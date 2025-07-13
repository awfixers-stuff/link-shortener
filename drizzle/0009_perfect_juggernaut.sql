ALTER TABLE "session" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "session" CASCADE;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "image" SET DEFAULT 'https://ef2gxidd9t.ufs.sh/f/ETlTZMbDvDzGETZQPtJDvDzGNXHcTyMLsOkiBCqb70uYnmta';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "links" DROP DEFAULT;--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_idx" ON "user" USING btree ("email");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");