import Button from "@/components/Button";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormSwitch from "@/components/forms/FormSwitch";
import { colors, globalStyles, spacing, typography } from "@/styles/global";
import { OnboardingTabs } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { CatProfileInput, catProfileInputSchema } from "@shared/index";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

type StepCatProfileScreenProps = {
	onStepComplete: (data: CatProfileInput) => void;
	navigateTab: (data: OnboardingTabs) => void;
};

export default function StepCatProfileScreen({
	onStepComplete,
	navigateTab,
}: StepCatProfileScreenProps) {
	const { control, handleSubmit } = useForm<CatProfileInput>({
		defaultValues: {
			name: "",
			weightKg: undefined,
			ageMonths: undefined,
			sex: "male",
			isNeutered: true,
			goal: "maintain",
			dailyCalorieTargetOverride: null,
		},
		resolver: zodResolver(catProfileInputSchema),
	});

	return (
		<KeyboardAvoidingView
			style={{ flex: 1, backgroundColor: colors.background }}
			behavior={"padding"}
			keyboardVerticalOffset={50}
		>
			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				keyboardShouldPersistTaps="handled"
			>
				<View style={styles.container}>
					<Text style={globalStyles.title}>
						Your Cat&apos;s Profile
					</Text>
					<View style={styles.inputContainer}>
						<FormInput
							name="name"
							label="Cat's Name"
							placeholder="Enter your cat's name"
							control={control}
						/>

						{/* SELECT WEIGHT AND AGE */}
						<View style={styles.rowContainer}>
							<View style={styles.halfInputWidth}>
								<FormInput
									name="weightKg"
									label="Weight (kg)"
									placeholder="Your cat's weight"
									control={control}
									keyboardType="numeric"
								/>
							</View>
							<View style={styles.halfInputWidth}>
								<FormInput
									name="ageMonths"
									label="Age"
									placeholder="Your cat's age"
									control={control}
									keyboardType="numeric"
								/>
							</View>
						</View>

						{/* SELECT GENDER */}
						<FormSelect
							control={control}
							name="sex"
							label="Select your Cat's gender"
							options={[
								{ label: "Male", value: "male" },
								{ label: "Female", value: "female" },
							]}
						/>
						{/* SELECT GOAL*/}
						<FormSelect
							control={control}
							name="goal"
							label="Select your Goal"
							options={[
								{ label: "Lose", value: "lose" },
								{ label: "Maintain", value: "maintain" },
								{ label: "Gain", value: "gain" },
							]}
						/>
						{/* Neutered Status */}
						<FormSwitch
							control={control}
							name="isNeutered"
							label="Neutered"
						/>
						<FormInput
							name="dailyCalorieTargetOverride"
							label="Daily Calorie Target"
							placeholder="Automatic calorie target calculation"
							control={control}
							keyboardType="numeric"
							emptyValue={null}
						/>

						<View style={styles.rowContainer}>
							<View style={styles.halfInputWidth}>
								<Button
									accessibilityLabel="Next button"
									onPress={handleSubmit(
										// we convert age from years to months
										(data) =>
											onStepComplete({
												...data,
												ageMonths: data.ageMonths * 12,
											}),
										(errors) =>
											console.log(
												"Form validation errors:",
												errors,
											),
									)}
								>
									<Text style={styles.buttonText}>Next</Text>
								</Button>
							</View>
							<View style={styles.halfInputWidth}>
								<Button
									style={styles.secondaryButton}
									accessibilityLabel="Previous button"
									onPress={() =>
										navigateTab(OnboardingTabs.ACCOUNT_TAB)
									}
								>
									<Text style={styles.buttonText}>
										Previous
									</Text>
								</Button>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		alignItems: "flex-start",
		backgroundColor: colors.background,
		paddingHorizontal: spacing.lg,
		paddingTop: spacing.xxs,
		paddingBottom: spacing.xl,
	},

	container: {
		justifyContent: "center",
	},

	rowContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: spacing.md,
	},

	inputContainer: {
		marginTop: spacing.xxxl,
		marginBottom: spacing.md,
	},

	halfInputWidth: {
		flex: 1,
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
