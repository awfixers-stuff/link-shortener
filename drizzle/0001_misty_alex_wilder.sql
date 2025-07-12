CREATE TABLE "link" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"destination" text NOT NULL,
	"visits" integer DEFAULT 0,
	"created_by_id" text,
	"created_at" date DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "link" ADD CONSTRAINT "link_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "link_key_idx" ON "link" USING btree ("key");--> statement-breakpoint
CREATE INDEX "link_visits_idx" ON "link" USING btree ("visits");--> statement-breakpoint
CREATE INDEX "link_created_by_id_idx" ON "link" USING btree ("created_by_id");--> statement-breakpoint
CREATE INDEX "link_created_at_idx" ON "link" USING btree ("created_at");