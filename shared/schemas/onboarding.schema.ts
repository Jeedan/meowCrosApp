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
export const zodGoal = z.enum(["lose", "maintain", "gain"]);
export type Goal = z.infer<typeof zodGoal>;

export const catProfileCreationFormSchema = z.object({
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

export type CatProfileFormData = z.infer<typeof catProfileCreationFormSchema>;
// ONLY FOR DUMMY DATA
// DB SCHEMA WILL USE DIFFERENT TYPE
export type CatProfile = z.infer<typeof catProfileCreationFormSchema> & {
	id: string;
	userId: string;
	created_at: Date;
	updated_at: Date;
};

// Notification Reminders Screen
const timeRegex = /^(?:[01]\d|2[0123]):(?:[012345]\d)$/;

export const notificationsFormSchema = z.object({
	startTime: z.string().regex(timeRegex).default("07:00"),
	endTime: z.string().regex(timeRegex).default("23:59"),
	// get string from form and transform it to number for backend.
	intervalMinutes: z
		.string()
		.default("300")
		.transform((val) => parseInt(String(val))),
});

export type NotificationFormInput = z.input<typeof notificationsFormSchema>;
export type NotificationFormOutput = z.output<typeof notificationsFormSchema>;
