import * as z from "zod";

// Todo: use constants
// hardcoded min length for now
export const accountCreationFormSchema = z
	.object({
		email: z.email(),
		password: z.string().min(8),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		error: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type AccountFormData = z.infer<typeof accountCreationFormSchema>;
