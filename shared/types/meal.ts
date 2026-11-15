import { NutritionData } from "./food";

export type PlateItem = {
	id: string;
	foodId: string;
	foodNameSnapshot: string;
	gramsServed: number;
	kcalCalculated: number;
} & NutritionData;

export type FeedingLog = {
	id: string;
	userId: string;
	plate: PlateItem[];
	loggedAt: Date;
};
