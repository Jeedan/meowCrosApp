import {
	decimal,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

// export const foodsTable = pgTable("foods", {
// 	id: uuid("id").primaryKey().defaultRandom(),
// 	userId: uuid("user_id")
// 		.notNull()
// 		.references(() => users.id, { onDelete: "cascade" }),
// 	name: varchar("name").notNull(),
// 	brand: varchar("brand").notNull(),
// 	foodType: varchar("food_type", { enum: ["wet", "dry"] }),
// 	proteinPCT: decimal("protein_PCT").notNull(),
// 	fatPCT: decimal("fat_PCT").notNull(),
// 	fiberPCT: decimal("fiber_PCT").notNull(),
// 	moisturePCT: decimal("moisture_PCT").notNull(),
// 	ashPCT: decimal("ash_PCT"),
// 	servingSizeG: decimal().notNull(),
// 	lastUsedAt: timestamp("last_used_at"),
// 	createdAt: timestamp("created_at").defaultNow().notNull(),
// 	updatedAt: timestamp("updated_at")
// 		.defaultNow()
// 		.notNull()
// 		.$onUpdate(() => new Date()),
// });
