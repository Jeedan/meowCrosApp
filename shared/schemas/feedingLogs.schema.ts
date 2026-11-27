import * as z from "zod";
import { zodFoodType } from "./foods.schema.ts";
import { exceeds100Percent } from "../utils/calorieCalculator.ts";

export const plateItemsInputSchema = z.object({
	foodId: z.uuid(),
	gramsServed: z.number({ error: "Grams Served is required" }).positive(),
});

export const plateItemsResponseSchema = plateItemsInputSchema
	.extend({
		id: z.uuid(),
		foodId: z.uuid().nullable(),
		foodNameSnapshot: z
			.string()
			.trim()
			.min(1, { error: "food name is required" }),
		brandSnapshot: z.string().trim().nullable(),
		foodTypeSnapshot: zodFoodType,
		proteinPCTSnapshot: z
			.number({ error: "Protein % is required" })
			.min(0, { error: "Must be 0 or greater" })
			.max(100, { error: "Cannot exceed 100%" }),
		fatPCTSnapshot: z
			.number({ error: "Fat % is required" })
			.min(0, { error: "Must be 0 or greater" })
			.max(100, { error: "Cannot exceed 100%" }),
		fiberPCTSnapshot: z
			.number({ error: "Fiber % is required" })
			.min(0, { error: "Must be 0 or greater" })
			.max(100, { error: "Cannot exceed 100%" }),
		moisturePCTSnapshot: z
			.number({ error: "Moisture % is required" })
			.min(0, { error: "Must be 0 or greater" })
			.max(100, { error: "Cannot exceed 100%" }),
		ashPCTSnapshot: z
			.number()
			.min(0, { error: "Must be 0 or greater" })
			.max(100, { error: "Cannot exceed 100%" }),
		gramsServed: z.number({ error: "Grams Served is required" }).positive(),
		kcalCalculated: z.number({ error: "Kcal is required" }).positive(),
	})
	.refine(
		(data) =>
			!exceeds100Percent({
				fatPCT: data.fatPCTSnapshot,
				fiberPCT: data.fiberPCTSnapshot,
				proteinPCT: data.proteinPCTSnapshot,
				foodType: data.foodTypeSnapshot,
				moisturePCT: data.moisturePCTSnapshot,
				ashPCT: data.ashPCTSnapshot,
			}),
		{
			error: "Nutrition exceeds 100%",
		},
	);

export const feedingLogInputSchema = z.object({
	loggedAt: z.iso.datetime(),
	plateItems: z.array(plateItemsInputSchema).min(1),
});

export const feedingLogResponseSchema = feedingLogInputSchema.extend({
	id: z.uuid(),
	createdAt: z.iso.datetime(),
	updatedAt: z.iso.datetime(),
	plateItems: z.array(plateItemsResponseSchema).min(1),
});

export const feedingLogIdSchema = z.object({
	feedingLogId: z.uuid(),
});

export type FeedingLogId = z.infer<typeof feedingLogIdSchema>;
export type FeedingLogResponse = z.infer<typeof feedingLogResponseSchema>;
export type FeedingLogInput = z.infer<typeof feedingLogInputSchema>;
export type PlateItemInput = z.infer<typeof plateItemsInputSchema>;
export type PlateItemResponse = z.infer<typeof plateItemsResponseSchema>;
