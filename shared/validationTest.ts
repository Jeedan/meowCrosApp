import { foodInputSchema, foodResponseSchema } from "./schemas/foods.schema.ts";

function checkValidation(res: any) {
	if (res.success) {
		console.log("Valid:", res.data);
	} else {
		console.log("Validation errors:", res.error.issues);
	}
}

const validFood = {
	name: "Purina One",
	brand: "Purina",
	foodType: "dry" as const,
	proteinPCT: 10,
	fatPCT: 5,
	fiberPCT: 1,
	moisturePCT: 80,
	ashPCT: null,
	servingSizeG: 85,
};

const valid = foodInputSchema.safeParse(validFood);

const invalidFood = {
	...validFood,
	name: "",
	proteinPCT: 30,
	ashPCT: -1,
	servingSizeG: 0,
};

const invalid = foodInputSchema.safeParse(invalidFood);
const validFoodResponse = {
	...validFood,
	id: "some-uuid",
	lastUsedAt: null,
	createdAt: "2026-11-15T10:00:00.000Z",
	updatedAt: "2026-11-15T10:00:00.000Z",
};

const validResponse = foodResponseSchema.safeParse(validFoodResponse);

const invalidFoodResponse = {
	...validFoodResponse,
	id: 1,
	createdAt: 1,
	updatedAt: 2,
};

const invalidResponse = foodResponseSchema.safeParse(invalidFoodResponse);

checkValidation(valid);
// checkValidation(invalid);
// checkValidation(validResponse);
// checkValidation(invalidResponse);
