import {
	calculateCaloriesFromServing,
	caloriesConsumedPerLog,
} from "@/utils/calorieCalculator";
import { randomTimestamp } from "@/utils/dateUtils";
import { randomRange } from "@/utils/random";
import { FeedingLog, NutritionData, PlateItem } from "@shared/types/meal";
import { foodItems } from "./dummyFoods";
import { incrementId } from "./dummyUtils";

// CREATES DUMMY DATA
export const feedingLog: FeedingLog[] = createFeedingLog(15);

// create a feeding log of 7+ days
// with around 4-10 small plate feedings
// each plateItem around 10-15gram serving food
// initial loop to determin number of days
// another loop to determin the number of daily feedings (test with 4)
// for each feeding create a random plate
// use incrementId for the id
// use "13" for userId
// loggedAt -  create a helper function that
// - create a date based on the index of the loop
// - create random timestamp for each feeding
// return the constructed feeding log
function createFeedingLog(days: number) {
	const feedingLog: FeedingLog[] = [];

	const numFeedings = randomRange(7, 10);

	for (let i = 0; i < days; i++) {
		for (let j = 0; j < numFeedings; j++) {
			const log: FeedingLog = {
				id: incrementId(),
				userId: "13",
				// to get randomized timestamps for each feeding per day
				// TODO: instead of random time, make it a random start time of 7-9am
				// then every 2-3 hour intervals afterwards
				// ending at 23:59
				loggedAt: randomTimestamp(i),
				plate: createRandomPlate(),
			};
			feedingLog.push(log);
		}
	}
	// TODO: return feeding log sorted by hours and minutes
	return feedingLog.sort(
		(a, b) => a.loggedAt.getHours() - b.loggedAt.getHours(),
	);
}

// History Screen Dummy data
export type DayHistory = {
	date: number;
	consumed: number;
};

// create a method that returns a DayHistory array of objects
export function createDayHistory(
	feedingLog: FeedingLog[],
	numberOfDays: number = 7,
) {
	const dayHistory: DayHistory[] = [];

	// create a map, dayTotals which will hold the dateKey as key
	// loggedAt as value
	const dayTotals = new Map<string, DayHistory>();

	for (const log of feedingLog) {
		// create a dateKey using the loggedAt to start
		//const dateKey = `${log.loggedAt.getFullYear()}-${log.loggedAt.getMonth()}-${log.loggedAt.getDate()}`;
		const dateKey = log.loggedAt.toLocaleDateString("en-GB");
		// console.log("dateKey:", dateKey);
		const kcal = caloriesConsumedPerLog(log);

		if (dayTotals.has(dateKey)) {
			// if the key is in the map, add it and add the kcal to consumed
			// dayHistory.consumed += kcal
			const day = dayTotals.get(dateKey);
			if (!day) continue;
			day.consumed += kcal;
		} else {
			// else if its the first time
			// initialize both fields
			const date = log.loggedAt.getTime();
			dayTotals.set(dateKey, {
				consumed: kcal,
				date: date,
			});
		}
	}
	// fill missing days
	const startDate = new Date();
	for (let i = 0; i < numberOfDays; i++) {
		const currentDay = new Date(startDate);
		currentDay.setDate(startDate.getDate() - i);
		const dateKey = currentDay.toLocaleDateString("en-GB");
		const dayEntry = {
			consumed: dayTotals.get(dateKey)?.consumed ?? 0,
			date: currentDay.getTime(),
		};
		dayHistory.push(dayEntry);
	}

	dayHistory.sort((a, b) => a.date - b.date);

	console.log("dayHistory:", JSON.stringify(dayHistory, null, 2));
	return dayHistory;
}

// create random plateItem
// random number from 10-15g
function createRandomPlateItem() {
	const foodId = Math.floor(Math.random() * foodItems.length);
	const food = foodItems[foodId];
	const nutrition: NutritionData = {
		foodType: food.foodType,
		ashPCT: food.ashPCT,
		fiberPCT: food.fiberPCT,
		fatPCT: food.fatPCT,
		moisturePCT: food.moisturePCT,
		proteinPCT: food.proteinPCT,
	};
	// random number from 10-15g
	const minServing = 10;
	const maxServing = 20;
	const served = randomRange(minServing, maxServing);

	const item: PlateItem = {
		id: incrementId(),
		foodId: food.id,
		foodType: food.foodType,
		foodNameSnapshot: food.name,
		proteinPCT: food.proteinPCT,
		fatPCT: food.fatPCT,
		ashPCT: food.ashPCT,
		moisturePCT: food.moisturePCT,
		fiberPCT: food.fiberPCT,
		gramsServed: served,
		kcalCalculated: calculateCaloriesFromServing(served, nutrition),
	};

	return item;
}

// create a random plate of 1-3 plateitems
function createRandomPlate() {
	const plate: PlateItem[] = [];
	const numOfPlateItems = randomRange(1, 3);
	for (let i = 0; i < numOfPlateItems; i++) {
		const item = createRandomPlateItem();
		plate.push(item);
	}

	return plate;
}
