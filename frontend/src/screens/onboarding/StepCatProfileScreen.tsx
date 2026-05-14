import Button from "@/components/Button";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormSwitch from "@/components/forms/FormSwitch";
import { colors, globalStyles } from "@/styles/global";
import { OnboardingTabs } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	catProfileCreationFormSchema,
	CatProfileFormData,
	Goal,
} from "@shared/index";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

type StepCatProfileScreenProps = {
	onStepComplete: (data: CatProfileFormData) => void;
	navigateTab: (data: OnboardingTabs) => void;
};

export default function StepCatProfileScreen({
	onStepComplete,
	navigateTab,
}: StepCatProfileScreenProps) {
	const { control, handleSubmit } = useForm<CatProfileFormData>({
		defaultValues: {
			name: "",
			weight: undefined,
			ageMonths: undefined,
			sex: "male",
			isNeutered: true,
			goal: "maintain",
		},
		resolver: zodResolver(catProfileCreationFormSchema),
	});

	return (
		<View style={styles.container}>
			<Text style={globalStyles.title}>Your Cat's Profile</Text>
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
							name="weight"
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
								navigateTab(OnboardingTabs.ACCOUNT_TAB)
							}
						>
							<Text style={styles.buttonText}>Previous</Text>
						</Button>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
	},

	rowContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 10,
	},

	inputContainer: {
		marginTop: 30,
		marginBottom: 10,
	},

	halfInputWidth: {
		flex: 1,
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
