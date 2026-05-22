import type { Goal } from "@shared/index";
import { NutritionData } from "@shared/types/meal";
import { ASH_PERCENTAGE_DRY, ASH_PERCENTAGE_WET } from "./constants";
// Lifestyle	Multiplier
// Neutered adult (inactive)	RER × 1.2
// Intact adult	RER × 1.4
// Weight loss goal	RER × 0.8
// Weight gain goal	RER × 1.2–1.4
// Kitten (< 12 months)	RER × 2.5

enum Multipliers {
	NEUTERED_ADULT_INACTIVE_MULTIPLIER = 1.2,
	INTACT_ADULT_MULTIPLIER = 1.4,
	WEIGHT_LOSS_MULTIPLIER = 0.8,
	WEIGHT_GAIN_MULTIPLIER = 1.3,
	KITTEN_MULTIPLIER = 2.5,
}

function calculateRER(weight_kg: number, multiplier: Multipliers) {
	const RER = 70 * Math.pow(weight_kg, 0.75);

	return Math.round(RER * multiplier);
}

export function totalDailyCalories(
	ageMonths: number,
	weight_kg: number,
	neutered: boolean,
	goal: Goal,
) {
	const isKitten = ageMonths < 12;
	if (isKitten) {
		return calculateRER(weight_kg, Multipliers.KITTEN_MULTIPLIER);
	} else {
		switch (goal) {
			case "maintain":
				if (neutered) {
					return calculateRER(
						weight_kg,
						Multipliers.NEUTERED_ADULT_INACTIVE_MULTIPLIER,
					);
				}
				return calculateRER(
					weight_kg,
					Multipliers.INTACT_ADULT_MULTIPLIER,
				);
			case "lose":
				return calculateRER(
					weight_kg,
					Multipliers.WEIGHT_LOSS_MULTIPLIER,
				);
			case "gain":
				return calculateRER(
					weight_kg,
					Multipliers.WEIGHT_GAIN_MULTIPLIER,
				);
			default:
				return calculateRER(
					weight_kg,
					Multipliers.NEUTERED_ADULT_INACTIVE_MULTIPLIER,
				);
		}
	}
}

// Food 1 — Chicken & Rice Entree (Gravy)
// Protein 11%, Fat 2%, Fiber 1.5%, Moisture 80%, Ash 2.7%
// Carbs = 100 − 11 − 2 − 1.5 − 80 − 2.7 = 2.8%
// 2.8%kcal/100g = (11×3.5) + (2×8.5) + (2.8×3.5) = 38.5 + 17 + 9.8 = ≈65kcal/100g

export function calculateAshPCT(
	ashPCT: number | undefined,
	foodType: "wet" | "dry",
) {
	return ashPCT
		? ashPCT
		: foodType === "wet"
			? ASH_PERCENTAGE_WET
			: ASH_PERCENTAGE_DRY;
}

export function calculateCaloriesFromServing(
	servingSize: number,
	food: NutritionData,
) {
	const ashPCT = calculateAshPCT(food.ashPCT, food.foodType);

	const carbs =
		100 -
		food.proteinPCT -
		food.fatPCT -
		food.fiberPCT -
		food.moisturePCT -
		ashPCT;

	// make sure we can't have negative carbs
	const guardCarbs = Math.max(0, carbs);

	const calsPerHundredGram =
		food.proteinPCT * 3.5 + food.fatPCT * 8.5 + guardCarbs * 3.5;
	const calsPerServing = (calsPerHundredGram / 100) * servingSize;
	return Math.round(calsPerServing);
}

export function calculateKcalPer100g(food: NutritionData) {
	const calories = calculateCaloriesFromServing(100, food);
	return calories;
}
