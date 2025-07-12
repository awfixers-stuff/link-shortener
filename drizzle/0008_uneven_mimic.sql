ALTER TABLE "user" ADD COLUMN "links" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "analytics" text DEFAULT 'basic';