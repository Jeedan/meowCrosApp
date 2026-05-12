import * as z from "zod";

// Todo: use constants
// hardcoded min length for now
/// Account Creation
export const accountCreationFormSchema = z
	.object({
		email: z.email(),
		password: z
			.string()
			.min(8, { error: "Too short. Minimum 8 characters" }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		error: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type AccountFormData = z.infer<typeof accountCreationFormSchema>;

// Cat Profile
export const catProfileCreationFormSchema = z.object({
	name: z.string().trim().min(1, { error: "Name is required" }),
	weight: z.coerce.number().min(0, { error: "Weight is required" }),
	ageMonths: z.coerce.number().min(0, { error: "Age is required" }),
	sex: z.enum(["male, female"]),
	isNeutered: z.boolean(),
	goal: z.enum(["lose_weight", "maintain", "gain_weight"]),
});

export type CatProfileFormData = z.infer<typeof catProfileCreationFormSchema>;
