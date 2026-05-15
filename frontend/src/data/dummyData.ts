import { type CatProfile } from "@shared/index";

// calculate how many days ago something was created
function daysAgo(n: number = 0) {
	const d = new Date();
	d.setDate(d.getDate() - n);
	return d;
}

let feedingLogId = "200";

function incrementFeedingLogId() {
	feedingLogId += 1;
	return feedingLogId.toString();
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

type foodItem = {
	id: string;
	name: string;
	brand: string;
	foodType: string;
	proteinPCT: number;
	fatPCT: number;
	fiberPCT: number;
	moisturePCT: number;
	ashPCT: number;
	servingSizeG: number;
	lastUsedAt: Date;
	created_at: Date;
	updated_at: Date;
};

export const foodItems = [
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
		lastUsedAt: daysAgo(0),
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
		lastUsedAt: daysAgo(0),
		created_at: daysAgo(8),
		updated_at: daysAgo(8),
	},
];

// Food 1 — Chicken & Rice Entree (Gravy)
// Protein 11%, Fat 2%, Fiber 1.5%, Moisture 80%, Ash 2.7%
// Carbs = 100 − 11 − 2 − 1.5 − 80 − 2.7 = 2.8%
// 2.8%kcal/100g = (11×3.5) + (2×8.5) + (2.8×3.5) = 38.5 + 17 + 9.8 = ≈65kcal/100g

function calulateCaloriesFromServing(servingSize: number, food: foodItem) {
	const carbs =
		100 -
		food.proteinPCT -
		food.fatPCT -
		food.fiberPCT -
		food.moisturePCT -
		food.ashPCT;
	const calsPerHundredGram =
		food.proteinPCT * 3.5 + food.fatPCT * 8.5 + carbs * 3.5;
	const calsPerServing = (calsPerHundredGram / 100) * servingSize;
	return Math.round(calsPerServing);
}

const feedingChicken = {
	id: incrementFeedingLogId(),
	userId: "13",
	foodId: "1",
	foodNameSnapshot: "Chicken and Rice Entree (Gravy)",
	gramsServed: 85,
	kcalCalculated: 0,
	loggedAt: daysAgo(),
};

const feedingSalmon = {
	id: incrementFeedingLogId(),
	userId: "13",
	foodId: "3",
	foodNameSnapshot: "Salmon/Fish (Sensitive Skin, Arctic Char)",
	gramsServed: 60,
	kcalCalculated: 0,
	loggedAt: daysAgo(),
};

const feedingHealthy = {
	id: incrementFeedingLogId(),
	userId: "13",
	foodId: "2",
	foodNameSnapshot: "Urinary Tract Health Chicken (Gravy)",
	gramsServed: 80,
	kcalCalculated: 0,
	loggedAt: daysAgo(),
};

// create a feeding log for X number of days
function createFeedingLog(days: number) {
	const feedingLog = [];

	for (let i = 0; i < days; i++) {
		feedingLog.push({
			...feedingChicken,
			id: incrementFeedingLogId(),
			loggedAt: daysAgo(i),
			kcalCalculated: calulateCaloriesFromServing(
				feedingChicken.gramsServed,
				foodItems[0],
			),
		});
		feedingLog.push({
			...feedingSalmon,
			id: incrementFeedingLogId(),
			loggedAt: daysAgo(i),
			kcalCalculated: calulateCaloriesFromServing(
				feedingSalmon.gramsServed,
				foodItems[1],
			),
		});
		feedingLog.push({
			...feedingHealthy,
			id: incrementFeedingLogId(),
			loggedAt: daysAgo(i),
			kcalCalculated: calulateCaloriesFromServing(
				feedingHealthy.gramsServed,
				foodItems[2],
			),
		});
	}

	return feedingLog;
}

export const feedingLog = createFeedingLog(7);
