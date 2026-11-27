import * as z from "zod";

export const zodGender = z.enum(["male", "female"]);
export type CatGender = z.infer<typeof zodGender>;

export const zodGoal = z.enum(["lose", "maintain", "gain"]);
export type CatGoal = z.infer<typeof zodGoal>;

const MAX_NAME_LENGTH = 50;
const MIN_CALORIE_TARGET = 1;
const MAX_CALORIE_TARGET = 2000;
const MIN_WEIGHT_KG = 1;
const MAX_WEIGHT_KG = 30;
const MIN_AGE_MONTHS = 1;

export const catProfileInputSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, { error: "Name is required" })
		.max(MAX_NAME_LENGTH, { error: "Too many characters" }),
	weightKg: z
		.number({ error: "Weight is required" })
		.min(MIN_WEIGHT_KG, { error: "Must be a valid weight" })
		.max(MAX_WEIGHT_KG, { error: `Cannot exceed ${MAX_WEIGHT_KG}` }),
	ageMonths: z
		.int({ error: "Age is required" })
		.min(MIN_AGE_MONTHS, { error: "Must be at least 1 month old" }),
	sex: zodGender,
	isNeutered: z.boolean(),
	goal: zodGoal,
	dailyCalorieTargetOverride: z
		.number()
		.min(MIN_CALORIE_TARGET, {
			error: `Must be at least ${MIN_CALORIE_TARGET}`,
		})
		.max(MAX_CALORIE_TARGET, {
			error: `Cannot exceed ${MAX_CALORIE_TARGET}`,
		})
		.nullable(),
});

export const catProfileResponseSchema = catProfileInputSchema.extend({
	id: z.uuid(),
	userId: z.string(),
	dailyCalorieTarget: z.number(),
	createdAt: z.iso.datetime(),
	updatedAt: z.iso.datetime(),
});

export const catProfilePatchSchema = catProfileInputSchema
	.partial()
	.refine((data) => Object.keys(data).length > 0, {
		error: "At least one field must be provided",
	});

export const catParamsSchema = z.object({
	catId: z.uuid(),
});

export type CatProfileInput = z.infer<typeof catProfileInputSchema>;
export type CatProfileResponse = z.infer<typeof catProfileResponseSchema>;
export type CatProfilePatch = z.infer<typeof catProfilePatchSchema>;
export type CatProfileParams = z.infer<typeof catParamsSchema>;

export type CatProfileData = z.infer<typeof catProfileInputSchema> & {
	id: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
};
