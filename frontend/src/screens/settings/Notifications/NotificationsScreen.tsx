import Button from "@/components/Button";
import FormSelect from "@/components/forms/FormSelect";
import TimePicker from "@/components/forms/TimePicker";
import {
	colors,
	globalStyles,
	radius,
	spacing,
	typography,
} from "@/styles/global";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	NotificationFormInput,
	NotificationFormOutput,
	notificationsFormSchema,
} from "@shared/index";
import React from "react";
import { Control, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

// TODO same UI as catprofile and account screen
// show read only versions then hit edit to change values
// save button should call handleSubmit
// need to setup handleSubmit
export default function NotificationsScreen() {
	const { control, handleSubmit } = useForm<
		NotificationFormInput,
		any,
		NotificationFormOutput
	>({
		resolver: zodResolver(notificationsFormSchema),
		defaultValues: {
			startTime: "07:00",
			endTime: "23:59",
			intervalMinutes: "300",
		},
	});
	const intervalOptions = [
		{ label: "3hr", value: "180" },
		{ label: "4hr", value: "240" },
		{ label: "6hr", value: "300" },
		{ label: "12hr", value: "720" },
	];

	return (
		<View style={styles.container}>
			<Text style={[styles.title]}>Reminders</Text>

			<View style={styles.card}>
				{/* Time picker */}
				<Text style={[styles.label]}>Start Time</Text>
				<TimePicker
					name="startTime"
					control={
						control as unknown as Control<NotificationFormInput>
					}
					label=""
				/>
				<Text style={[styles.label]}>End Time</Text>
				<TimePicker
					name="endTime"
					control={
						control as unknown as Control<NotificationFormInput>
					}
					label=""
				/>

				<View style={[styles.interval]}>
					<FormSelect
						control={
							control as unknown as Control<NotificationFormInput>
						}
						name="intervalMinutes"
						label="Reminder interval"
						labelStyle={styles.label}
						options={intervalOptions}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		paddingHorizontal: spacing.lg,
	},

	card: {
		backgroundColor: colors.cardBackground,
		width: "100%",
		borderRadius: radius.lg,
		paddingHorizontal: spacing.lg,
		marginBottom: spacing.md,
	},

	interval: {
		marginVertical: spacing.md,
	},

	title: {
		fontSize: typography.title,
		color: colors.text,
		marginTop: spacing.xl,
		marginBottom: spacing.lg,
		fontWeight: "bold",
	},

	label: {
		fontSize: typography.bodyLarge,
		color: colors.text,
		fontWeight: "300",
		marginTop: spacing.lg,
		marginBottom: spacing.sm,
	},

	buttonText: {
		color: colors.text,
		fontSize: typography.body,
		fontWeight: "600",
	},

	secondaryButton: {
		backgroundColor: colors.secondary,
	},
});
