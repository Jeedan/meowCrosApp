export type Meal = {
	id: string;
	loggedAt: Date;
	userId: string;
	foodId: string;
	foodNameSnapshot: string;
	gramsServed: number;
	kcalCalculated: number;
};
