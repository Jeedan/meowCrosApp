import { FoodInput } from "@shared/index";

export type FoodFormData = Omit<
	FoodInput,
	| "brand"
	| "proteinPCT"
	| "fiberPCT"
	| "fatPCT"
	| "moisturePCT"
	| "ashPCT"
	| "servingSizeG"
> & {
	brand: string;
	proteinPCT?: number;
	fatPCT?: number;
	fiberPCT?: number;
	moisturePCT?: number;
	ashPCT?: number;
	servingSizeG?: number;
};
