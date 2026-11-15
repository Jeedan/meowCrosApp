import type { NutritionData } from "../types/food.ts";

export const ASH_PERCENTAGE_WET = 1.5;
export const ASH_PERCENTAGE_DRY = 2;

export function calculateAshPCT(
	ashPCT: number | undefined,
	foodType: "wet" | "dry",
) {
	if (ashPCT != null) {
		return ashPCT;
	}
	return foodType === "wet" ? ASH_PERCENTAGE_WET : ASH_PERCENTAGE_DRY;
}

export function exceeds100Percent(nutrition: NutritionData) {
	const ash = calculateAshPCT(nutrition.ashPCT, nutrition.foodType);
	const protein = nutrition.proteinPCT;
	const fat = nutrition.fatPCT;
	const fiber = nutrition.fiberPCT;
	const moisture = nutrition.moisturePCT;

	const percentageWarning = protein + fat + fiber + moisture + ash > 100;
	return percentageWarning;
}
