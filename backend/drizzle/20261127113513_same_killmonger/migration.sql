CREATE TABLE "feeding_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL,
	"logged_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plate_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"feeding_log_id" uuid NOT NULL,
	"food_id" uuid,
	"food_name_snapshot" varchar NOT NULL,
	"brand_snapshot" varchar,
	"food_type_snapshot" varchar NOT NULL,
	"protein_pct_snapshot" numeric(5,2) NOT NULL,
	"fat_pct_snapshot" numeric(5,2) NOT NULL,
	"fiber_pct_snapshot" numeric(5,2) NOT NULL,
	"moisture_pct_snapshot" numeric(5,2) NOT NULL,
	"ash_pct_snapshot" numeric(5,2) NOT NULL,
	"grams_served" numeric(7,2) NOT NULL,
	"kcal_calculated" numeric(8,2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "food_type_check" CHECK ("food_type_snapshot" IN('wet', 'dry'))
);
--> statement-breakpoint
CREATE INDEX "feeding_logs_idx" ON "feeding_logs" ("user_id","logged_at");--> statement-breakpoint
CREATE INDEX "feeding_log_id_idx" ON "plate_items" ("feeding_log_id");--> statement-breakpoint
CREATE INDEX "food_id_idx" ON "plate_items" ("food_id");--> statement-breakpoint
ALTER TABLE "feeding_logs" ADD CONSTRAINT "feeding_logs_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "plate_items" ADD CONSTRAINT "plate_items_feeding_log_id_feeding_logs_id_fkey" FOREIGN KEY ("feeding_log_id") REFERENCES "feeding_logs"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "plate_items" ADD CONSTRAINT "plate_items_food_id_foods_id_fkey" FOREIGN KEY ("food_id") REFERENCES "foods"("id") ON DELETE SET NULL;