import { eq } from "drizzle-orm";
import { foodsTable } from "../foods-schema.ts";
import { db } from "../index.ts";
import type {
	FoodInput,
	FoodResponse,
} from "../../../../shared/schemas/foods.schema.ts";

export async function getFoods(userId: string) {
	const result = await db
		.select()
		.from(foodsTable)
		.where(eq(foodsTable.userId, userId));

	return result;
}

//type NewFood = typeof foodsTable.$inferInsert;

// use the food input type
export async function createFood(userId: string, food: FoodInput) {
	const [result] = await db
		.insert(foodsTable)
		.values({
			userId: userId,
			name: food.name,
			brand: food.brand,
			servingSizeG: food.servingSizeG.toString(),
			proteinPCT: food.proteinPCT.toString(),
			fatPCT: food.fatPCT.toString(),
			fiberPCT: food.fiberPCT.toString(),
			moisturePCT: food.moisturePCT.toString(),
			ashPCT: food.ashPCT !== null ? food.ashPCT.toString() : null,
			foodType: food.foodType,
		})
		.returning();

	const response: FoodResponse = {
		name: result.name,
		brand: result.brand,
		servingSizeG: Number(result.servingSizeG),
		proteinPCT: Number(result.proteinPCT),
		fatPCT: Number(result.fatPCT),
		fiberPCT: Number(result.fiberPCT),
		moisturePCT: Number(result.moisturePCT),
		ashPCT: result.ashPCT !== null ? Number(result.ashPCT) : null,
		foodType: result.foodType,
		id: result.id,
		lastUsedAt:
			result.lastUsedAt !== null ? result.lastUsedAt.toISOString() : null,
		createdAt: result.createdAt.toISOString(),
		updatedAt: result.updatedAt.toISOString(),
	};
	return response;
}
