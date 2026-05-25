import { calculateCaloriesFromServing } from "@/utils/calorieCalculator";
import { daysAgo } from "@/utils/dateUtils";
import { type CatProfile } from "@shared/index";
import { FoodItem } from "@shared/types/meal";

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

const feedingChicken = {
	id: incrementId(),
	userId: "13",
	foodId: "1",
	foodNameSnapshot: "Chicken and Rice Entree (Gravy)",
	gramsServed: 85,
	kcalCalculated: 0,
	loggedAt: daysAgo(),
};

const feedingSalmon = {
	id: incrementId(),
	userId: "13",
	foodId: "3",
	foodNameSnapshot: "Salmon/Fish (Sensitive Skin, Arctic Char)",
	gramsServed: 60,
	kcalCalculated: 0,
	loggedAt: daysAgo(),
};

const feedingHealthy = {
	id: incrementId(),
	userId: "13",
	foodId: "2",
	foodNameSnapshot: "Urinary Tract Health Chicken (Gravy)",
	gramsServed: 80,
	kcalCalculated: 0,
	loggedAt: daysAgo(),
};

export const feedingTEST = {
	id: incrementId(),
	userId: "13",
	foodId: "3",
	foodNameSnapshot: "Test Food No Ash",
	gramsServed: 60,
	kcalCalculated: 0,
	loggedAt: daysAgo(),
};

// TODO MEAL TYPE FOR FEEDING LOG
// rename to PlateItem
const mealTest = {
	id: incrementId(),
	userId: "13",
	plate: [
		{
			foodId: "3",
			foodNameSnapshot: "Test Food No Ash",
			foodType: "dry",
			proteinPCT: 10,
			fatPCT: 5,
			fiberPCT: 1,
			moisturePCT: 75,
			ashPCT: undefined,
			gramsServed: 60,
			kcalCalculated: 0,
		},
		{
			foodId: "2",
			foodNameSnapshot: "Urinary Tract Health Chicken (Gravy)",
			foodType: "dry",
			proteinPCT: 10,
			fatPCT: 5,
			fiberPCT: 1,
			moisturePCT: 75,
			gramsServed: 60,
			ashPCT: 1.5,
			kcalCalculated: 0,
		},
	],
	loggedAt: daysAgo(),
};

// create a feeding log for X number of days
function createFeedingLog(days: number) {
	const feedingLog = [];

	for (let i = 0; i < days; i++) {
		feedingLog.push({
			...feedingChicken,
			loggedAt: daysAgo(i),
			kcalCalculated: calculateCaloriesFromServing(
				feedingChicken.gramsServed,
				foodItems[0],
			),
		});
		feedingLog.push({
			...feedingSalmon,
			loggedAt: daysAgo(i),
			kcalCalculated: calculateCaloriesFromServing(
				feedingSalmon.gramsServed,
				foodItems[1],
			),
		});
		feedingLog.push({
			...feedingHealthy,
			loggedAt: daysAgo(i),
			kcalCalculated: calculateCaloriesFromServing(
				feedingHealthy.gramsServed,
				foodItems[2],
			),
		});
		feedingLog.push({
			...feedingTEST,
			loggedAt: daysAgo(i),
			kcalCalculated: calculateCaloriesFromServing(
				feedingTEST.gramsServed,
				foodItems[3],
			),
		});
	}

	return feedingLog;
}

export const feedingLog = createFeedingLog(7);
