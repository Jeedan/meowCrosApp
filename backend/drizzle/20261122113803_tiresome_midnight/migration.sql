CREATE TABLE "cats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL UNIQUE,
	"name" varchar(50) NOT NULL,
	"weight_kg" numeric(5,2) NOT NULL,
	"age_months" integer NOT NULL,
	"sex" varchar NOT NULL,
	"is_neutered" boolean NOT NULL,
	"goal" varchar NOT NULL,
	"daily_calorie_target_override" numeric(7,2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "cats_sex_check" CHECK ("sex" IN ('male', 'female')),
	CONSTRAINT "cats_goal_check" CHECK ("goal" IN ('lose', 'maintain', 'gain'))
);
--> statement-breakpoint
ALTER TABLE "cats" ADD CONSTRAINT "cats_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;