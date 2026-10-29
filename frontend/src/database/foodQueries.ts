import { dbPromise } from "@/database/database";
import { FoodItem } from "@shared/types/meal";
import { foodItems } from "@/data/dummyData";

export async function insertFood(food: FoodItem) {
	const db = await dbPromise;

	await db.runAsync(
		`INSERT INTO foods (
			id,
			name,
			brand,
			foodType,
			proteinPCT,
			fatPCT,
			fiberPCT,
			moisturePCT,
			ashPCT,
			servingSizeG,
			lastUsedAt,
			created_at,
			updated_at
		) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
		food.id,
		food.name,
		food.brand,
		food.foodType,
		food.proteinPCT,
		food.fatPCT,
		food.fiberPCT,
		food.moisturePCT,
		food.ashPCT ?? null,
		food.servingSizeG,
		food.lastUsedAt.toISOString(),
		food.created_at.toISOString(),
		food.updated_at.toISOString(),
	);
}

export async function getFoods(): Promise<FoodItem[]> {
	const db = await dbPromise;

	const rows = await db.getAllAsync<{
		id: string;
		name: string;
		brand: string;
		foodType: "wet" | "dry";
		proteinPCT: number;
		fatPCT: number;
		fiberPCT: number;
		moisturePCT: number;
		ashPCT: number | null;
		servingSizeG: number;
		lastUsedAt: string;
		created_at: string;
		updated_at: string;
	}>("SELECT * FROM foods ORDER BY name COLLATE NOCASE");

	return rows.map((row) => ({
		...row,
		ashPCT: row.ashPCT ?? undefined,
		lastUsedAt: new Date(row.lastUsedAt),
		created_at: new Date(row.created_at),
		updated_at: new Date(row.updated_at),
	}));
}

export async function deleteFood(id: string) {
	const db = await dbPromise;

	await db.runAsync("DELETE FROM foods WHERE id = ?", id);
}

// Seed the database with our dummy data on first launch
// otherwise just return
export async function seedFoods() {
	const db = await dbPromise;

	const result = await db.getFirstAsync<{ count: number }>(
		"SELECT COUNT(*) AS count FROM foods",
	);

	// return if not empty
	if (result && result.count > 0) {
		return;
	}

	for (const food of foodItems) {
		await insertFood(food);
	}

	console.log(`[SQLite] Seeded ${foodItems.length} foods`);
}
