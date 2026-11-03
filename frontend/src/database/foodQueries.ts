import { db, dbPromise } from "@/database/database";
import { FoodItem } from "@shared/types/meal";
import { foodItems } from "@/data/dummy";
import { foods } from "./schema";
import { randomUUID } from "expo-crypto";
import { asc, eq } from "drizzle-orm";

//drizzle
export async function insertFood(food: FoodItem) {
	await db.insert(foods).values({
		id: randomUUID(),
		name: food.name,
		brand: food.brand,
		foodType: food.foodType,
		proteinPCT: food.proteinPCT,
		fatPCT: food.fatPCT,
		fiberPCT: food.fiberPCT,
		moisturePCT: food.moisturePCT,
		ashPCT: food.ashPCT ?? null,
		servingSizeG: food.servingSizeG,
		lastUsedAt: food.lastUsedAt.toISOString(),
		created_at: food.created_at.toISOString(),
		updated_at: food.updated_at.toISOString(),
	});
}

export async function getFoods(): Promise<FoodItem[]> {
	const rows = await db.select().from(foods).orderBy(asc(foods.name));

	return rows.map((row) => ({
		...row,
		ashPCT: row.ashPCT ?? undefined,
		lastUsedAt: new Date(row.lastUsedAt),
		created_at: new Date(row.created_at),
		updated_at: new Date(row.updated_at),
	}));
}

export async function getFood(id: string): Promise<FoodItem> {
	const [row] = await db.select().from(foods).where(eq(foods.id, id));

	return {
		...row,
		ashPCT: row.ashPCT ?? undefined,
		lastUsedAt: new Date(row.lastUsedAt),
		created_at: new Date(row.created_at),
		updated_at: new Date(row.updated_at),
	};
}

export async function deleteFood(id: string) {
	await db.delete(foods).where(eq(foods.id, id));
}

// delete all
export async function deleteAllFoods() {
	await db.delete(foods);
}

export async function seedFoods() {
	const result = await db.$count(foods);

	console.log("seedFoods count(*) result: ", result);

	if (result && result > 0) {
		return;
	}

	for (const food of foodItems) {
		await insertFood(food);
	}

	console.log(`[Drizzle SQLite] Seeded ${foodItems.length} foods`);
}
