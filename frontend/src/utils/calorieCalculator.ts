import type { Goal } from "@shared/index";
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
