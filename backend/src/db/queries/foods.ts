import { and, eq } from "drizzle-orm";
import { foodsTable } from "../foods-schema.ts";
import { db } from "../index.ts";
import type {
	FoodInput,
	FoodResponse,
} from "../../../../shared/schemas/foods.schema.ts";
import { NotFoundError } from "../../utils/AppError.ts";

type FoodRow = typeof foodsTable.$inferSelect;

export async function getFoods(userId: string): Promise<FoodResponse[]> {
	const result = await db
		.select()
		.from(foodsTable)
		.where(eq(foodsTable.userId, userId));

	const response = result.map((item) => buildFoodResponse(item));
	return response;
}

// get food By id
export async function getFoodById(
	userId: string,
	foodId: string,
): Promise<FoodResponse> {
	const [result] = await db
		.select()
		.from(foodsTable)
		.where(and(eq(foodsTable.userId, userId), eq(foodsTable.id, foodId)));

	if (!result) throw new NotFoundError("Resource not found.");

	return buildFoodResponse(result);
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

export async function updateFood(
	userId: string,
	foodId: string,
	food: FoodInput,
): Promise<FoodResponse> {
	const [result] = await db
		.update(foodsTable)
		.set({
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
		.where(and(eq(foodsTable.userId, userId), eq(foodsTable.id, foodId)))
		.returning();

	if (!result) throw new NotFoundError("Resource not found.");
	return buildFoodResponse(result);
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
