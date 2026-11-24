import type { CatProfileData } from "../../../shared/schemas/cats.schema.ts";

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

// TODO: add optional manual daily calorie limit
// optionally pass in a manual multiplier as well
// take it as a second parameter
// check before isKitten
// if a value is not 0 or "", use it
// other wise move on through the RER calculations.
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
