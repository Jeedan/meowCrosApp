import type { CatProfileData } from "../../../shared/schemas/cats.schema.ts";
import type { NutritionData } from "../../../shared/types/food.ts";

export const ASH_PERCENTAGE_WET = 1.5;
export const ASH_PERCENTAGE_DRY = 2;

const Multipliers = {
	NEUTERED_ADULT_INACTIVE_MULTIPLIER: 1.2,
	INTACT_ADULT_MULTIPLIER: 1.4,
	WEIGHT_LOSS_MULTIPLIER: 0.8,
	WEIGHT_GAIN_MULTIPLIER: 1.3,
	KITTEN_MULTIPLIER: 2.5,
} as const;

type Multiplier = (typeof Multipliers)[keyof typeof Multipliers];

function calculateRER(weightKg: number, multiplier: Multiplier) {
	const RER = 70 * Math.pow(weightKg, 0.75);

	return Math.round(RER * multiplier);
}

export function calcTotalDailyCalories(cat: CatProfileData) {
	if (cat.dailyCalorieTargetOverride != null) {
		return cat.dailyCalorieTargetOverride;
	}

	const isKitten = cat.ageMonths < 12;
	if (isKitten) {
		return calculateRER(cat.weightKg, Multipliers.KITTEN_MULTIPLIER);
	} else {
		switch (cat.goal) {
			case "maintain":
				if (cat.isNeutered) {
					return calculateRER(
						cat.weightKg,
						Multipliers.NEUTERED_ADULT_INACTIVE_MULTIPLIER,
					);
				}
				return calculateRER(
					cat.weightKg,
					Multipliers.INTACT_ADULT_MULTIPLIER,
				);
			case "lose":
				return calculateRER(
					cat.weightKg,
					Multipliers.WEIGHT_LOSS_MULTIPLIER,
				);
			case "gain":
				return calculateRER(
					cat.weightKg,
					Multipliers.WEIGHT_GAIN_MULTIPLIER,
				);
			default:
				return calculateRER(
					cat.weightKg,
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
	if (ashPCT != null) {
		return ashPCT;
	}
	return foodType === "wet" ? ASH_PERCENTAGE_WET : ASH_PERCENTAGE_DRY;
}

export function calculateCaloriesFromServing(
	servingSize: number,
	food: NutritionData,
) {
	const ashPCT = calculateAshPCT(food.ashPCT, food.foodType);
	const protein = food.proteinPCT;
	const fat = food.fatPCT;
	const fiber = food.fiberPCT;
	const moisture = food.moisturePCT;

	const carbs = 100 - protein - fat - fiber - moisture - ashPCT;

	// make sure we can't have negative carbs
	const guardCarbs = Math.max(0, carbs);

	const calsPerHundredGram = protein * 3.5 + fat * 8.5 + guardCarbs * 3.5;
	const calsPerServing = (calsPerHundredGram / 100) * servingSize;
	return Math.round(calsPerServing);
}
