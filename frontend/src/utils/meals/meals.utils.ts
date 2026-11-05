import { FeedingLog, NutritionData, PlateItem } from "@shared/types/meal";
import { randomUUID } from "expo-crypto";
import { calculateCaloriesFromServing } from "../calorieCalculator";
import { daysAgo } from "../dateUtils";

// QUICK ADD
// const plate: PlateItem[] = lastFood.map((item) => ({
//       ...item,
//       id: randomUUID(),
//     }));
// const log: FeedingLog = {
//   id: randomUUID(),
//   userId: "13",
//   loggedAt: daysAgo(0),
//   plate: plate,
// };
// await addMeal(log);

// ADD MEAL
// construct a feedinglog object
// const plate: PlateItem[] = watchedFieldArray.map(
//   (item: PlateFormItem) => ({
//     id: randomUUID(),
//     foodId: item.id,
//     foodNameSnapshot: item.name,
//     foodType: item.foodType,
//     proteinPCT: item.proteinPCT,
//     fatPCT: item.fatPCT,
//     fiberPCT: item.fiberPCT,
//     moisturePCT: item.moisturePCT,
//     ashPCT: item.ashPCT,
//     kcalCalculated: calculateCaloriesFromServing(
//       item.gramsServed,
//       item,
//     ),
//     gramsServed: item.gramsServed,
//   }),
// );

// const parsedDate = loggedAt ? new Date(loggedAt) : daysAgo(0);
// const log: FeedingLog = {
//   id: randomUUID(),
//   userId: "13",
//   loggedAt: Number.isNaN(parsedDate.getTime())
//     ? daysAgo(0)
//     : parsedDate,
//   plate: plate,
// };
// await addMeal(log);

// export type PlateItem = {
//   id: string;
//   foodId: string;
//   foodNameSnapshot: string;
//   gramsServed: number;
//   kcalCalculated: number;
// } & NutritionData;

// export type FeedingLog = {
//   id: string;
//   userId: string;
//   plate: PlateItem[];
//   loggedAt: Date;
// };

type CreateMealItem = {
	foodId: string;
	foodNameSnapshot: string;
	gramsServed: number;
} & NutritionData;

type CreateMealInput = {
	userId: string;
	loggedAt: Date;
	items: CreateMealItem[];
};

export function createMeal(input: CreateMealInput): FeedingLog {
	const plate: PlateItem[] = input.items.map((item) => ({
		id: randomUUID(),
		gramsServed: item.gramsServed,
		foodType: item.foodType,
		foodId: item.foodId,
		kcalCalculated: calculateCaloriesFromServing(item.gramsServed, item),
		foodNameSnapshot: item.foodNameSnapshot,
		proteinPCT: item.proteinPCT,
		fiberPCT: item.fiberPCT,
		fatPCT: item.fatPCT,
		moisturePCT: item.moisturePCT,
		ashPCT: item.ashPCT,
	}));

	return {
		id: randomUUID(),
		userId: input.userId,
		loggedAt: input.loggedAt,
		plate: plate,
	};
}
