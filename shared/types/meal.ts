export type Legacy_Meal = {
	id: string;
	userId: string;
	foodId: string;
	foodNameSnapshot: string;
	gramsServed: number;
	kcalCalculated: number;
	loggedAt: Date;
};

export type FoodItem = {
	id: string;
	name: string;
	brand: string;
	foodType: "wet" | "dry";
	proteinPCT: number;
	fatPCT: number;
	fiberPCT: number;
	moisturePCT: number;
	ashPCT?: number;
	servingSizeG: number;
	lastUsedAt: Date;
	created_at: Date;
	updated_at: Date;
};

export type NutritionData = {
	foodType: "wet" | "dry";
	proteinPCT: number;
	fatPCT: number;
	fiberPCT: number;
	moisturePCT: number;
	ashPCT?: number;
};

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
