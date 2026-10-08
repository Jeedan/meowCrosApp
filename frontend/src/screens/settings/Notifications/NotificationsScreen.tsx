import Button from "@/components/Button";
import FormSelect from "@/components/forms/FormSelect";
import TimePicker from "@/components/forms/TimePicker";
import { colors, globalStyles } from "@/styles/global";
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
					label="Start Time"
				/>
				<Text style={[styles.label]}>End Time</Text>
				<TimePicker
					name="endTime"
					control={
						control as unknown as Control<NotificationFormInput>
					}
					label="End Time"
				/>

				<View style={[styles.interval]}>
					<FormSelect
						control={
							control as unknown as Control<NotificationFormInput>
						}
						name="intervalMinutes"
						label="Reminder interval"
						labelStyle={styles.label}
						options={[
							{ label: "3hr", value: "180" },
							{ label: "4hr", value: "240" },
							{ label: "6hr", value: "300" },
							{ label: "12hr", value: "720" },
						]}
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
		paddingHorizontal: 16,
	},

	card: {
		backgroundColor: colors.cardBackground,
		width: "100%",
		borderRadius: 12,
		paddingHorizontal: 16,
		marginBottom: 10,
	},

	interval: {
		marginVertical: 10,
	},

	title: {
		fontSize: 22,
		color: colors.text,
		marginTop: 20,
		marginBottom: 16,
		fontWeight: "bold",
	},

	label: {
		fontSize: 18,
		color: colors.text,
		fontWeight: "300",
		marginTop: 16,
	},

	buttonText: {
		color: colors.text,
		fontSize: 16,
		fontWeight: "600",
	},

	secondaryButton: {
		backgroundColor: colors.secondary,
	},
});
