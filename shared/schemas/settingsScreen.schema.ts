import * as z from "zod";
import { zodGoal } from "./cats.schema.ts";

// Todo: use constants
// hardcoded min length for now
/// Account Creation
export const accountSettingsFormSchema = z.object({
	name: z.string().min(2, { error: "Too short. Minimum 2 characters" }),
	email: z.email(),
	password: z.string().min(8, { error: "Too short. Minimum 8 characters" }),
});

export type AccountSettingsData = z.infer<typeof accountSettingsFormSchema>;

// Cat Profile
export const catProfileSettingsFormSchema = z.object({
	name: z.string().trim().min(1, { error: "Name is required" }),
	weightKg: z
		.number({ error: "Weight is required" })
		.min(0.5, { error: "Must be positive and more than 0" }),
	ageMonths: z
		.number({ error: "Age is required" })
		.min(0, { error: "Must be positive" })
		.transform((years) => years * 12),
	sex: z.enum(["male", "female"]),
	isNeutered: z.boolean(),
	goal: zodGoal,
	dailyCalorieTargetOverride: z.number().min(1).nullable(),
});

export type CatProfileSettingsData = z.infer<
	typeof catProfileSettingsFormSchema
>;
