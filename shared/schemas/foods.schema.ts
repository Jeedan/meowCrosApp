import * as z from "zod";
import { exceeds100Percent } from "../utils/calorieCalculator";

export const zodFoodType = z.enum(["wet", "dry"]);
export type FoodType = z.infer<typeof zodFoodType>;

// creation
// what client sends to the backend
export const foodInputSchema = z
	.object({
		name: z.string().trim().min(1, { error: "Name is required" }),
		brand: z.string().trim().nullable(),
		foodType: zodFoodType,
		proteinPCT: z
			.number({ error: "Protein % is required" })
			.min(0, { error: "Must be 0 or greater" })
			.max(100, { error: "Cannot exceed 100%" }),
		fatPCT: z
			.number({ error: "Fat % is required" })
			.min(0, { error: "Must be 0 or greater" })
			.max(100, { error: "Cannot exceed 100%" }),
		fiberPCT: z
			.number({ error: "Fiber % is required" })
			.min(0, { error: "Must be 0 or greater" })
			.max(100, { error: "Cannot exceed 100%" }),
		moisturePCT: z
			.number({ error: "Moisture % is required" })
			.min(0, { error: "Must be 0 or greater" })
			.max(100, { error: "Cannot exceed 100%" }),
		ashPCT: z
			.number()
			.min(0, { error: "Must be 0 or greater" })
			.max(100, { error: "Cannot exceed 100%" })
			.nullable(),
		servingSizeG: z
			.number({ error: "Serving size is required" })
			.positive(),
	})
	.refine(
		(data) =>
			!exceeds100Percent({
				fatPCT: data.fatPCT,
				fiberPCT: data.fiberPCT,
				proteinPCT: data.proteinPCT,
				foodType: data.foodType,
				moisturePCT: data.moisturePCT,
				ashPCT: data.ashPCT ?? undefined,
			}),
		{
			error: "Nutrition exceeds 100%",
		},
	);

export type FoodInput = z.infer<typeof foodInputSchema>;

// response
// what we expect to get back from the database
// we use schema.extend() to create a new response schema with the previous schema as a base.
export const foodResponseSchema = foodInputSchema.extend({
	id: z.string(),
	lastUsedAt: z.iso.datetime().nullable(),
	createdAt: z.iso.datetime(),
	updatedAt: z.iso.datetime(),
});

export type FoodResponse = z.infer<typeof foodResponseSchema>;

export const foodIdSchema = z.uuid();
