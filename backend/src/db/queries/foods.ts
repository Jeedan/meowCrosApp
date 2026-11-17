import { eq } from "drizzle-orm";
import { foodsTable } from "../foods-schema.ts";
import { db } from "../index.ts";
import type {
	FoodInput,
	FoodResponse,
} from "../../../../shared/schemas/foods.schema.ts";

type FoodRow = typeof foodsTable.$inferSelect;

export async function getFoods(userId: string): Promise<FoodResponse[]> {
	const result = await db
		.select()
		.from(foodsTable)
		.where(eq(foodsTable.userId, userId));

	const response = result.map((item) => buildFoodResponse(item));
	return response;
}

// use the food input type
export async function createFood(
	userId: string,
	food: FoodInput,
): Promise<FoodResponse> {
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

	const response = buildFoodResponse(result);

	return response;
}

function buildFoodResponse(input: FoodRow): FoodResponse {
	return {
		name: input.name,
		brand: input.brand,
		servingSizeG: Number(input.servingSizeG),
		proteinPCT: Number(input.proteinPCT),
		fatPCT: Number(input.fatPCT),
		fiberPCT: Number(input.fiberPCT),
		moisturePCT: Number(input.moisturePCT),
		ashPCT: input.ashPCT !== null ? Number(input.ashPCT) : null,
		foodType: input.foodType,
		id: input.id,
		lastUsedAt:
			input.lastUsedAt !== null ? input.lastUsedAt.toISOString() : null,
		createdAt: input.createdAt.toISOString(),
		updatedAt: input.updatedAt.toISOString(),
	};
}
