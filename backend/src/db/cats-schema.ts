import {
	boolean,
	check,
	decimal,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema.ts";
import { sql } from "drizzle-orm";

export const cats = pgTable(
	"cats",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		userId: text("user_id")
			.unique()
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		name: varchar("name", { length: 50 }).notNull(),
		weightKg: decimal("weight_kg", { precision: 5, scale: 2 }).notNull(),
		ageMonths: integer("age_months").notNull(),
		sex: varchar("sex", { enum: ["male", "female"] }).notNull(),
		isNeutered: boolean("is_neutered").notNull(),
		goal: varchar("goal", { enum: ["lose", "maintain", "gain"] }).notNull(),
		dailyCalorieTargetOverride: decimal("daily_calorie_target_override", {
			precision: 7,
			scale: 2,
		}),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.notNull()
			.$onUpdate(() => new Date()),
	},
	(table) => [
		check("cats_sex_check", sql`${table.sex} IN ('male', 'female')`),
		check(
			"cats_goal_check",
			sql`${table.goal} IN ('lose', 'maintain', 'gain')`,
		),
	],
);
