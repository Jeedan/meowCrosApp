import {
	decimal,
	pgTable,
	timestamp,
	uuid,
	varchar,
	text,
	check,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema.ts";
import { sql } from "drizzle-orm";

export const foodsTable = pgTable(
	"foods",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		name: varchar("name").notNull(),
		brand: varchar("brand"),
		foodType: varchar("food_type", { enum: ["wet", "dry"] }).notNull(),
		proteinPCT: decimal("protein_pct").notNull(),
		fatPCT: decimal("fat_pct").notNull(),
		fiberPCT: decimal("fiber_pct").notNull(),
		moisturePCT: decimal("moisture_pct").notNull(),
		ashPCT: decimal("ash_pct"),
		servingSizeG: decimal("serving_size_g").notNull(),
		lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
		createdAt: timestamp("created_at", { withTimezone: true })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.defaultNow()
			.notNull()
			.$onUpdate(() => new Date()),
	},
	(table) => [
		check("food_type_check", sql`${table.foodType} IN ('wet', 'dry')`),
	],
);
