ALTER TABLE "foods" RENAME COLUMN "protein_PCT" TO "protein_pct";--> statement-breakpoint
ALTER TABLE "foods" RENAME COLUMN "fat_PCT" TO "fat_pct";--> statement-breakpoint
ALTER TABLE "foods" RENAME COLUMN "fiber_PCT" TO "fiber_pct";--> statement-breakpoint
ALTER TABLE "foods" RENAME COLUMN "moisture_PCT" TO "moisture_pct";--> statement-breakpoint
ALTER TABLE "foods" RENAME COLUMN "ash_PCT" TO "ash_pct";--> statement-breakpoint
ALTER TABLE "foods" ALTER COLUMN "last_used_at" SET DATA TYPE timestamp with time zone USING "last_used_at"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "foods" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone USING "created_at"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "foods" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone USING "updated_at"::timestamp with time zone;--> statement-breakpoint
ALTER TABLE "foods" ADD CONSTRAINT "food_type_check" CHECK ("food_type" IN ('wet', 'dry'));