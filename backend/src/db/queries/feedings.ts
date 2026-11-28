import { and, asc, eq, gte, inArray, lt } from "drizzle-orm";
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

type PlateItemRow = typeof plateItems.$inferSelect;

// grab feeding log and filter by date
// if a date is provided
// GET /api/v1/feedings?date=2026-11-28&timezone=Europe/Istanbul
// date-fns-tz use this library to convert timezones
export async function getFeedingLog(
	userId: string,
	date: Date = new Date(),
): Promise<FeedingLogResponse[]> {
	// TODO: timezone conversion using library
	// midnigth of the starting day
	const startOfDay = new Date(date);
	startOfDay.setHours(0, 0, 0, 0);

	// the next day
	const startOfNextDay = new Date(date);
	startOfNextDay.setDate(startOfNextDay.getDate() + 1);
	startOfNextDay.setHours(0, 0, 0, 0);

	const result = await db
		.select()
		.from(feedinglogs)
		.where(
			and(
				eq(feedinglogs.userId, userId),
				gte(feedinglogs.loggedAt, startOfDay),
				lt(feedinglogs.loggedAt, startOfNextDay),
			),
		)
		.leftJoin(plateItems, eq(feedinglogs.id, plateItems.feedingLogId))
		.orderBy(asc(feedinglogs.loggedAt));

	// build one feeding Log with plateItems
	// feedingLogId, Response
	// we use a map to group duplicates together
	const logsById = new Map<string, FeedingLogResponse>();
	for (const row of result) {
		const feedingLogId = row.feeding_logs.id;
		if (!logsById.has(feedingLogId)) {
			logsById.set(feedingLogId, {
				id: feedingLogId,
				loggedAt: row.feeding_logs.loggedAt.toISOString(),
				createdAt: row.feeding_logs.createdAt.toISOString(),
				updatedAt: row.feeding_logs.updatedAt.toISOString(),
				plateItems: [],
			});
		}

		const feedingLog = logsById.get(feedingLogId)!;
		if (row.plate_items) {
			feedingLog.plateItems.push(buildPlateResponse(row.plate_items));
		}
	}

	return Array.from(logsById.values());
}

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

		// Map of type <string, food> and
		// the string in this case is the food.id we use to filter by
		const foodsById = new Map(foundFoods.map((food) => [food.id, food]));

		const createdPlateItems: PlateItemResponse[] = [];
		for (const item of log.plateItems) {
			const food = foodsById.get(item.foodId);
			if (!food) throw new NotFoundError("Food not found");

			const ashResult = calculateAshPCT(
				food.ashPCT === null ? undefined : Number(food.ashPCT),
				food.foodType,
			);

			const [plateItem] = await tx
				.insert(plateItems)
				.values({
					feedingLogId: feedingLog.id,
					foodId: food.id,
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
