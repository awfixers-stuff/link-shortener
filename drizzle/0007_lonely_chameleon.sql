ALTER TABLE "link" DROP CONSTRAINT "link_created_by_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "link" ADD CONSTRAINT "link_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;