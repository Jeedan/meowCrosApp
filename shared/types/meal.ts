export type Meal = {
	id: string;
	loggedAt: Date;
	userId: string;
	foodId: string;
	foodNameSnapshot: string;
	gramsServed: number;
	kcalCalculated: number;
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
