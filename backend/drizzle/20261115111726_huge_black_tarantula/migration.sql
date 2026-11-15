CREATE TABLE "foods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL,
	"name" varchar NOT NULL,
	"brand" varchar,
	"food_type" varchar NOT NULL,
	"protein_PCT" numeric NOT NULL,
	"fat_PCT" numeric NOT NULL,
	"fiber_PCT" numeric NOT NULL,
	"moisture_PCT" numeric NOT NULL,
	"ash_PCT" numeric,
	"serving_size_g" numeric NOT NULL,
	"last_used_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "foods" ADD CONSTRAINT "foods_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;