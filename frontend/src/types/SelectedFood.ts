export type SelectedFoodItem = {
	id: string;
	name: string;
	brand?: string;
	foodType: "dry" | "wet";
	proteinPCT: number;
	fatPCT: number;
	fiberPCT: number;
	moisturePCT: number;
	ashPCT?: number;
	servingSizeG: number;
};
