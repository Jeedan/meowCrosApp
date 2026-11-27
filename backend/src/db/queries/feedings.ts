import { and, eq, inArray } from "drizzle-orm";
import { db } from "../index.ts";
import { NotFoundError } from "../../utils/AppError.ts";
import type {
	FeedingLogInput,
	FeedingLogResponse,
	PlateItemResponse,
} from "../../../../shared/index.ts";
import { feedinglogs, plateItems } from "../feedingLogs-schema.ts";
import { foods } from "../foods-schema.ts";
import {
	calculateAshPCT,
	calculateCaloriesFromServing,
} from "../../utils/calorieCalculator.ts";

// Create the parent feeding log.
// Retrieve foods belonging to the authenticated user.
// Reject missing or foreign foods.
// Create one plate item per input item.
// Roll everything back if any operation fails.
// Return the parent with its created plate items.
export async function createFeedingLog(
	userId: string,
	log: FeedingLogInput,
): Promise<FeedingLogResponse> {
	const result = await db.transaction(async (tx) => {
		// create a feeding log
		const [feedingLog] = await tx
			.insert(feedinglogs)
			.values({
				userId,
				loggedAt: new Date(log.loggedAt),
			})
			.returning();

		//store FoodIds so we can filter food query for relevant IDs
		const foodIds = log.plateItems.map((item) => item.foodId);

		const foundFoods = await tx
			.select()
			.from(foods)
			.where(and(eq(foods.userId, userId), inArray(foods.id, foodIds)));

		const createdPlateItems: PlateItemResponse[] = [];
		for (const item of log.plateItems) {
			const food = foundFoods.find((f) => f.id === item.foodId);

			if (!food) throw new NotFoundError("Food not found");

			const foodId: string = food.id;

			const ashResult = calculateAshPCT(
				food.ashPCT === null ? undefined : Number(food.ashPCT),
				food.foodType,
			);

			const [plateItem] = await tx
				.insert(plateItems)
				.values({
					feedingLogId: feedingLog.id,
					foodId: foodId,
					gramsServed: item.gramsServed.toString(),
					foodNameSnapshot: food.name,
					brandSnapshot: food.brand,
					foodTypeSnapshot: food.foodType,
					proteinPCTSnapshot: food.proteinPCT,
					fatPCTSnapshot: food.fatPCT,
					fiberPCTSnapshot: food.fiberPCT,
					moisturePCTSnapshot: food.moisturePCT,
					ashPCTSnapshot: ashResult.toString(),
					kcalCalculated: calculateCaloriesFromServing(
						item.gramsServed,
						{
							foodType: food.foodType,
							fatPCT: Number(food.fatPCT),
							fiberPCT: Number(food.fiberPCT),
							proteinPCT: Number(food.proteinPCT),
							moisturePCT: Number(food.moisturePCT),
							ashPCT: ashResult,
						},
					).toString(),
				})
				.returning();

			// add build plate item to createdPlateItem
			createdPlateItems.push(buildPlateResponse(plateItem));
		}
		return { feedingLog, createdPlateItems };
	});
	return {
		id: result.feedingLog.id,
		createdAt: result.feedingLog.createdAt.toISOString(),
		updatedAt: result.feedingLog.updatedAt.toISOString(),
		loggedAt: result.feedingLog.loggedAt.toISOString(),
		plateItems: result.createdPlateItems,
	};
}

type PlateItemRow = typeof plateItems.$inferSelect;

function buildPlateResponse(input: PlateItemRow): PlateItemResponse {
	return {
		id: input.id,
		foodId: input.foodId,
		foodNameSnapshot: input.foodNameSnapshot,
		brandSnapshot: input.brandSnapshot,
		foodTypeSnapshot: input.foodTypeSnapshot,
		proteinPCTSnapshot: Number(input.proteinPCTSnapshot),
		fatPCTSnapshot: Number(input.fatPCTSnapshot),
		fiberPCTSnapshot: Number(input.fiberPCTSnapshot),
		moisturePCTSnapshot: Number(input.moisturePCTSnapshot),
		ashPCTSnapshot: Number(input.ashPCTSnapshot),
		gramsServed: Number(input.gramsServed),
		kcalCalculated: Number(input.kcalCalculated),
	};
}
