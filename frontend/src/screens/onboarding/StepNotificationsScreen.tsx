import Button from "@/components/Button";
import FormSelect from "@/components/forms/FormSelect";
import TimePicker from "@/components/forms/TimePicker";
import { colors, globalStyles } from "@/styles/global";
import { OnboardingTabs } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	NotificationFormInput,
	NotificationFormOutput,
	notificationsFormSchema,
} from "@shared/index";
import { Control, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

type StepNotificationsScreenProps = {
	onStepComplete: (data: NotificationFormOutput) => void;
	navigateTab: (data: OnboardingTabs) => void;
};

export default function StepNotificationsScreen({
	onStepComplete,
	navigateTab,
}: StepNotificationsScreenProps) {
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
			<Text style={[globalStyles.title, styles.spacingBottom]}>
				Notifications
			</Text>

			{/* Time picker */}
			<Text style={[styles.sectionTitle]}>Reminders</Text>
			<View style={[styles.rowContainer, styles.spacingBottom]}>
				<TimePicker
					name="startTime"
					control={
						control as unknown as Control<NotificationFormInput>
					}
					label="Start Time"
				/>
				<TimePicker
					name="endTime"
					control={
						control as unknown as Control<NotificationFormInput>
					}
					label="End Time"
				/>
			</View>

			<View style={[styles.container, styles.spacingBottom]}>
				<FormSelect
					control={
						control as unknown as Control<NotificationFormInput>
					}
					name="intervalMinutes"
					label="Reminder interval"
					labelStyle={styles.sectionTitle}
					options={[
						{ label: "3hr", value: "180" },
						{ label: "4hr", value: "240" },
						{ label: "6hr", value: "300" },
						{ label: "12hr", value: "720" },
					]}
				/>
			</View>

			<View style={styles.rowContainer}>
				<View style={styles.halfInputWidth}>
					<Button
						accessibilityLabel="Next button"
						onPress={handleSubmit(onStepComplete)}
					>
						<Text style={styles.buttonText}>Next</Text>
					</Button>
				</View>

				<View style={styles.halfInputWidth}>
					<Button
						style={styles.secondaryButton}
						accessibilityLabel="Previous button"
						onPress={() =>
							navigateTab(OnboardingTabs.CATPROFILE_TAB)
						}
					>
						<Text style={styles.buttonText}>Previous</Text>
					</Button>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},

	rowContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-evenly",
		gap: 5,
		paddingHorizontal: 14,
	},

	halfInputWidth: {
		flex: 1,
		paddingHorizontal: 4,
	},

	buttonText: {
		color: colors.text,
		fontSize: 16,
		fontWeight: "600",
	},

	secondaryButton: {
		backgroundColor: colors.secondary,
	},

	spacingBottom: {
		marginBottom: 20,
	},

	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: colors.textSecondary,
		marginBottom: 2,
	},
});
