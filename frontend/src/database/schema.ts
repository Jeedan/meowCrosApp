import { FoodItem } from "@shared/types/meal";
import { sql } from "drizzle-orm";
import {
	check,
	foreignKey,
	index,
	real,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

export const foods = sqliteTable(
	"foods",
	{
		id: text().primaryKey().notNull(),
		name: text().notNull(),
		brand: text().notNull(),
		foodType: text().$type<FoodItem["foodType"]>().notNull(),
		proteinPCT: real().notNull(),
		fatPCT: real().notNull(),
		fiberPCT: real().notNull(),
		moisturePCT: real().notNull(),
		ashPCT: real(),
		servingSizeG: real().notNull(),
		lastUsedAt: text().notNull(),
		created_at: text().notNull(),
		updated_at: text().notNull(),
	},
	(table) => [
		check("food_type_check", sql`${table.foodType} IN ('wet', 'dry')`),
	],
);

// I added created_at and updated_at.
// i forgot about this last time but its convention to have it on all tables
export const feedingLogs = sqliteTable("feeding_logs", {
	id: text().primaryKey().notNull(),
	userId: text().notNull(),
	loggedAt: text().notNull(),
	created_at: text().notNull(),
	updated_at: text().notNull(),
});

// I added created_at and updated_at.
// i forgot about this last time but its convention to have it on all tables
// this would also simplify some logged at code...i guess i tunnel visioned
export const plateItems = sqliteTable(
	"plate_items",
	{
		id: text().primaryKey().notNull(),
		feedingLogId: text()
			.notNull()
			.references(() => feedingLogs.id, { onDelete: "cascade" }),
		foodId: text().notNull(),
		foodType: text().$type<FoodItem["foodType"]>().notNull(),
		foodNameSnapshot: text().notNull(),
		proteinPCT: real().notNull(),
		fatPCT: real().notNull(),
		fiberPCT: real().notNull(),
		moisturePCT: real().notNull(),
		ashPCT: real(),
		gramsServed: real().notNull(),
		kcalCalculated: real().notNull(),
		created_at: text().notNull(),
		updated_at: text().notNull(),
	},
	(table) => [
		check("food_type_check", sql`${table.foodType} IN ('wet', 'dry')`),
		index("idx_plate_items_feedinglogsId").on(table.feedingLogId),
	],
);
