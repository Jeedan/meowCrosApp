import Button from "@/components/Button";
import FormSelect from "@/components/forms/FormSelect";
import { colors, globalStyles } from "@/styles/global";
import { OnboardingTabs } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	notificationFormInput,
	notificationFormOutput,
	notificationsFormSchema,
} from "@shared/index";
import { Control, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

type StepNotificationsScreenProps = {
	onStepComplete: (data: notificationFormOutput) => void;
	navigateTab: (data: OnboardingTabs) => void;
};

export default function StepNotificationsScreen({
	onStepComplete,
	navigateTab,
}: StepNotificationsScreenProps) {
	const { control, handleSubmit } = useForm<
		notificationFormInput,
		any,
		notificationFormOutput
	>({
		resolver: zodResolver(notificationsFormSchema),
	});

	return (
		<View style={styles.container}>
			<Text style={globalStyles.title}>Reminders</Text>
			<FormSelect
				control={control as unknown as Control<notificationFormInput>}
				name="intervalMinutes"
				label="Reminder interval"
				options={[
					{ label: "3hr", value: "3" },
					{ label: "4hr", value: "4" },
					{ label: "6hr", value: "6" },
					{ label: "12hr", value: "12" },
				]}
			/>

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

	inputContainer: {
		marginTop: 30,
		marginBottom: 10,
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
});
