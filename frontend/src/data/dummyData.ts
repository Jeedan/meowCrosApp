import {
	calculateCaloriesFromServing,
	caloriesConsumedPerLog,
} from "@/utils/calorieCalculator";
import { daysAgo, randomTimestamp } from "@/utils/dateUtils";
import { randomRange } from "@/utils/random";
import { type CatProfile } from "@shared/index";
import {
	FeedingLog,
	FoodItem,
	NutritionData,
	PlateItem,
} from "@shared/types/meal";

let dummyId = 200;

export function incrementId() {
	dummyId += 1;
	return dummyId.toString();
}

export const userProfile = {
	id: "13",
	name: "Jeedan",
	email: "Jeedan.Cuneyt@gmail.com",
	password: "123",
	created_at: daysAgo(10),
	updated_at: daysAgo(10),
};

export const catProfile: CatProfile = {
	id: "23",
	userId: "13",
	name: "Moggie",
	ageMonths: 60,
	weight: 7,
	sex: "male",
	isNeutered: true,
	goal: "lose",
	created_at: daysAgo(10),
	updated_at: daysAgo(10),
};

export const foodItems: FoodItem[] = [
	{
		id: "0",
		name: "Chicken and Rice Entree (Gravy)",
		brand: "Purina",
		foodType: "wet",
		proteinPCT: 11,
		fatPCT: 2,
		fiberPCT: 1.5,
		moisturePCT: 80,
		ashPCT: 2.7,
		servingSizeG: 85,
		lastUsedAt: daysAgo(0),
		created_at: daysAgo(10),
		updated_at: daysAgo(10),
	},
	{
		id: "1",
		name: "Urinary Tract Health Chicken (Gravy)",
		brand: "Purina",
		foodType: "wet",
		proteinPCT: 12,
		fatPCT: 3.5,
		fiberPCT: 0.2,
		ashPCT: 1.5,
		moisturePCT: 78,
		servingSizeG: 100,
		lastUsedAt: daysAgo(3),
		created_at: daysAgo(9),
		updated_at: daysAgo(9),
	},
	{
		id: "2",
		name: "Salmon/Fish (Sensitive Skin, Arctic Char)",
		brand: "Purina",
		foodType: "wet",
		proteinPCT: 10,
		fatPCT: 6,
		fiberPCT: 1.5,
		moisturePCT: 78,
		ashPCT: 3.5,
		servingSizeG: 100,
		lastUsedAt: daysAgo(2),
		created_at: daysAgo(8),
		updated_at: daysAgo(8),
	},
	{
		id: "3",
		name: "Test Food No Ash",
		brand: "Test Purina",
		foodType: "dry",
		proteinPCT: 10,
		fatPCT: 5,
		fiberPCT: 1,
		moisturePCT: 75,
		servingSizeG: 100,
		lastUsedAt: daysAgo(5),
		created_at: daysAgo(5),
		updated_at: daysAgo(5),
	},
];

export function sortByLastUsed(items: FoodItem[]) {
	const sorted = items.sort((a, b) =>
		b.lastUsedAt
			.toLocaleDateString()
			.localeCompare(a.lastUsedAt.toLocaleDateString()),
	);
	return sorted;
}

export const feedingLog: FeedingLog[] = createFeedingLog(7);

// History Screen Dummy data
type DayHistory = {
	date: number;
	consumed: number;
};

// TODO
// create a method that returns a DayHistory array of objects
export function createDayHistory(feedingLog: FeedingLog[]) {
	const dayHistory: DayHistory[] = [];

	// create a map, dayTotals which will hold the dateKey as key
	// loggedAt as value
	const dayTotals = new Map<string, DayHistory>();

	for (const log of feedingLog) {
		// create a dateKey using the loggedAt to start
		// const dateKey= `${year}-${month}-${day}`;
		const dateKey = `${log.loggedAt.getFullYear()}-${log.loggedAt.getMonth()}-${log.loggedAt.getDate()}`;
		console.log("dateKey:", dateKey);
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
	// construct DayHistory[] using the Map values
	// [0] = key
	// [1] = value, {consumed, date} object in this case
	for (const [key, value] of dayTotals.entries()) {
		dayHistory.push({
			date: value.date,
			consumed: value.consumed,
		});
	}

	console.log("dayHistory:", JSON.stringify(dayHistory));
	return dayHistory.reverse();
}

// TODO move this to history
//createDayHistory(feedingLog);

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

	const numFeedings = 10;

	for (let i = 0; i < days; i++) {
		for (let j = 0; j < numFeedings; j++) {
			const log: FeedingLog = {
				id: incrementId(),
				userId: "13",
				// TODO: replace with helper function
				// to get randomized timestamps for each feeding per day
				loggedAt: randomTimestamp(i),
				plate: createRandomPlate(),
			};
			feedingLog.push(log);
		}
	}
	return feedingLog;
}
