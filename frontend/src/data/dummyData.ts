import { calculateCaloriesFromServing } from "@/utils/calorieCalculator";
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
// loop over feedinglog and create a DayHistory object:
// containing: date (loggedAT)
// consumed: calculate based on values in plate
// dayHistory should be the ENTIRE calories consumed for a day
// grab feedinglog from zustand or as parameter
// loop over each feeding log and add plate calories together
// then sum the calories if the day is a log from the same day
// then add it to day history object array
export function createDayHistory() {
	const dayHistory: DayHistory = {
		date: 0,
		consumed: 0,
	};

	

	return dayHistory;
}

// create random plateItem
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
	const served = randomRange(10, 15);

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
	const numOfPlateItems = Math.floor(Math.random() * 3) + 1;
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

	const numFeedings = 4;

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
