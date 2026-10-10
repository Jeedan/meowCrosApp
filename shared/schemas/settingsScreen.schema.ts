import * as z from "zod";
import { zodGoal } from "./onboarding.schema";

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
	weight: z
		.number({ error: "Weight is required" })
		.min(0, { error: "Must be positive" }),
	ageMonths: z
		.number({ error: "Age is required" })
		.min(0, { error: "Must be positive" }),
	sex: z.enum(["male", "female"]),
	isNeutered: z.boolean(),
	goal: zodGoal,
});

export type CatProfileSettingsData = z.infer<
	typeof catProfileSettingsFormSchema
>;
