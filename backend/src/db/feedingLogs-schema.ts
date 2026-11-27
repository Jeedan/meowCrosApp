import {
	decimal,
	pgTable,
	timestamp,
	uuid,
	varchar,
	text,
	check,
	index,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema.ts";
import { sql } from "drizzle-orm";
import { foods } from "./foods-schema.ts";

export const feedinglogs = pgTable(
	"feeding_logs",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		loggedAt: timestamp("logged_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.notNull()
			.$onUpdate(() => new Date()),
	},
	(table) => [index("feeding_logs_idx").on(table.userId, table.loggedAt)],
);

const SCALE = 2;
const NUTRITION_PRECISION = 5;
const GRAMS_PRECISION = 7;
const KCAL_PRECISION = 8;

export const plateItems = pgTable(
	"plate_items",
	{
		id: uuid("id").defaultRandom().primaryKey(),
		feedingLogId: uuid("feeding_log_id")
			.notNull()
			.references(() => feedinglogs.id, {
				onDelete: "cascade",
			}),
		foodId: uuid("food_id").references(() => foods.id, {
			onDelete: "set null",
		}),
		foodNameSnapshot: varchar("food_name_snapshot").notNull(),
		brandSnapshot: varchar("brand_snapshot"),
		foodTypeSnapshot: varchar("food_type_snapshot", {
			enum: ["wet", "dry"],
		}).notNull(),
		proteinPCTSnapshot: decimal("protein_pct_snapshot", {
			precision: NUTRITION_PRECISION,
			scale: SCALE,
		}).notNull(),
		fatPCTSnapshot: decimal("fat_pct_snapshot", {
			precision: NUTRITION_PRECISION,
			scale: SCALE,
		}).notNull(),
		fiberPCTSnapshot: decimal("fiber_pct_snapshot", {
			precision: NUTRITION_PRECISION,
			scale: SCALE,
		}).notNull(),
		moisturePCTSnapshot: decimal("moisture_pct_snapshot", {
			precision: NUTRITION_PRECISION,
			scale: SCALE,
		}).notNull(),
		ashPCTSnapshot: decimal("ash_pct_snapshot", {
			precision: NUTRITION_PRECISION,
			scale: SCALE,
		}).notNull(),
		gramsServed: decimal("grams_served", {
			precision: GRAMS_PRECISION,
			scale: SCALE,
		}).notNull(),
		kcalCalculated: decimal("kcal_calculated", {
			precision: KCAL_PRECISION,
			scale: SCALE,
		}).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.notNull()
			.$onUpdate(() => new Date()),
	},
	(table) => [
		check(
			"food_type_check",
			sql`${table.foodTypeSnapshot} IN('wet', 'dry')`,
		),
		index("feeding_log_id_idx").on(table.feedingLogId),
		index("food_id_idx").on(table.foodId),
	],
);
