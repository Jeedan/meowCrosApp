import Button from "@/components/Button";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormSwitch from "@/components/forms/FormSwitch";
import useCatProfile from "@/hooks/catProfile/useCatProfile";
import useUpdateCatProfile from "@/hooks/catProfile/useUpdateCatProfile";
import { colors, radius, spacing, typography } from "@/styles/global";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CatProfilePatch,
	catProfilePatchSchema,
	CatProfileSettingsData,
	catProfileSettingsFormSchema,
} from "@shared/index";
import React, { useState, useEffect } from "react";
import { FieldPath, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

const genderOptions = [
	{ label: "Male", value: "male" },
	{ label: "Female", value: "female" },
];

const goalOptions = [
	{
		label: "Lose",
		value: "lose",
	},
	{
		label: "Maintain",
		value: "maintain",
	},
	{
		label: "Gain",
		value: "gain",
	},
];

export default function CatProfileScreen() {
	const { cat: catProfileData, isLoading, isError } = useCatProfile();

	const updateCat = useUpdateCatProfile();

	const { control, trigger, resetField, getValues, reset, watch, setError } =
		useForm<CatProfileSettingsData>({
			defaultValues: {
				name: "",
				ageMonths: 0,
				weightKg: 0,
				sex: "female",
				isNeutered: false,
				goal: "maintain",
				dailyCalorieTargetOverride: null,
			},
			resolver: zodResolver(catProfileSettingsFormSchema),
		});

	const profile = watch();

	// Reset form after fetching Cat Profile finishes
	useEffect(() => {
		if (catProfileData) {
			reset({
				name: catProfileData.name,
				ageMonths: catProfileData.ageMonths / 12,
				weightKg: catProfileData.weightKg,
				sex: catProfileData.sex ?? "female",
				isNeutered: catProfileData.isNeutered ?? false,
				goal: catProfileData.goal ?? "maintain",
				dailyCalorieTargetOverride:
					catProfileData.dailyCalorieTargetOverride,
			});
		}
	}, [reset, catProfileData]);

	// store whether we are editing a field or not
	const [editingField, setEditingField] = useState<
		| "name"
		| "ageMonths"
		| "weightKg"
		| "sex"
		| "isNeutered"
		| "goal"
		| "dailyCalorieTargetOverride"
		| null
	>(null);

	const catProfileOptions = [
		{ name: "name", label: "Name", text: profile.name },
		{ name: "ageMonths", label: "Age", text: profile.ageMonths },
		{
			name: "weightKg",
			label: "Current Weight",
			text: profile.weightKg + " kg",
		},
		{ name: "sex", label: "Gender", text: profile.sex },
		{
			name: "isNeutered",
			label: "Neutered status",
			text: profile.isNeutered ? "Neutered" : "Not Neutered",
		},
		{ name: "goal", label: "Goal", text: profile.goal },
		{
			name: "dailyCalorieTargetOverride",
			label: "Calorie Calculation",
			text:
				profile.dailyCalorieTargetOverride !== null
					? `${profile.dailyCalorieTargetOverride} kcal`
					: "Automatic",
		},
	] as const;

	async function saveField(item: (typeof catProfileOptions)[number]) {
		const isValid = await trigger(item.name);
		if (!isValid) return;

		const value = getValues(item.name);

		const parsedValue =
			item.name === "ageMonths"
				? catProfileSettingsFormSchema.shape.ageMonths.parse(value)
				: value;

		// convert age to years
		const result = catProfilePatchSchema.safeParse({
			[item.name]: parsedValue,
		});

		if (!result.success) {
			for (const issue of result.error.issues) {
				const field = issue.path[0];

				if (typeof field === "string") {
					setError(field as FieldPath<CatProfilePatch>, {
						type: "schema",
						message: issue.message,
					});
				}
			}
			return;
		}

		const payload: CatProfilePatch = result.data;
		updateCat.mutateAsync({ catId: catId, data: payload });

		setEditingField(null);
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<Text style={styles.text}>Loading...</Text>
			</View>
		);
	}

	if (isError) {
		return (
			<View style={styles.centered}>
				<Text style={styles.deleteText}>An Error occured...</Text>
			</View>
		);
	}

	if (!catProfileData || catProfileData === undefined) {
		console.error("No Cat data");
		return;
	}

	const catId = catProfileData.id;

	function renderEditor(item: (typeof catProfileOptions)[number]) {
		switch (item.name) {
			case "name":
			case "ageMonths":
			case "weightKg":
			case "dailyCalorieTargetOverride":
				return (
					<>
						<FormInput
							name={item.name}
							fieldContainerStyle={styles.fieldContainer}
							inputStyle={styles.input}
							placeholder={`Enter ${item.label}`}
							keyboardType={
								item.name === "weightKg" ||
								item.name === "ageMonths" ||
								item.name === "dailyCalorieTargetOverride"
									? "numeric"
									: "default"
							}
							control={control}
							emptyValue={
								item.name === "dailyCalorieTargetOverride"
									? null
									: undefined
							}
						/>
					</>
				);
			case "sex":
				return (
					<FormSelect
						control={control}
						name="sex"
						label="Select your Cat's gender"
						options={genderOptions}
						showLabel={false}
					/>
				);
			case "isNeutered":
				return (
					<FormSwitch
						control={control}
						name="isNeutered"
						label="Neutered status"
						fieldContainerStyle={styles.fieldContainer}
					/>
				);
			case "goal":
				return (
					<FormSelect
						control={control}
						name="goal"
						label="Select your Goal"
						options={goalOptions}
						showLabel={false}
					/>
				);
		}
	}
	return (
		<KeyboardAvoidingView
			style={{ flex: 1, backgroundColor: colors.background }}
			behavior={"padding"}
			keyboardVerticalOffset={100}
		>
			<ScrollView
				contentContainerStyle={styles.container}
				keyboardShouldPersistTaps="handled"
			>
				<Text style={styles.title}>Profile</Text>

				<View style={styles.card}>
					{catProfileOptions.map((item, index) => (
						<View key={item.name}>
							<Text style={styles.label}>{item.label}</Text>
							<View
								style={
									editingField === item.name
										? styles.editingContainer
										: styles.row
								}
							>
								{editingField === item.name ? (
									<>
										{/* TODO: extract the edit forminputs into its own component to clean up and make it easier to see whats going on  */}
										{renderEditor(item)}

										<View style={styles.editActions}>
											<Button
												style={[
													styles.actionButton,
													styles.cancelButton,
												]}
												accessibilityRole="button"
												accessibilityLabel={`Cancel ${item.label}`}
												onPress={() => {
													resetField(item.name);
													setEditingField(null);
												}}
											>
												<Text style={styles.editText}>
													Cancel
												</Text>
											</Button>

											<Button
												style={[
													styles.actionButton,
													styles.saveButton,
												]}
												accessibilityRole="button"
												accessibilityLabel={`Save ${item.label}`}
												onPress={() => saveField(item)}
											>
												<Text style={styles.saveText}>
													Save
												</Text>
											</Button>
										</View>
									</>
								) : (
									<>
										<View style={styles.fieldContainer}>
											<Text style={styles.text}>
												{item.text}
											</Text>
										</View>

										<Button
											style={styles.editButton}
											accessibilityRole="button"
											accessibilityLabel={`Edit ${item.label}`}
											onPress={() => {
												setEditingField(item.name);
											}}
										>
											<Text style={styles.editText}>
												Edit
											</Text>
										</Button>
									</>
								)}
							</View>
							{index < catProfileOptions.length - 1 && (
								<View style={styles.divider} />
							)}
						</View>
					))}
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	container: {
		flexGrow: 1,
		alignItems: "flex-start",
		backgroundColor: colors.background,
		paddingHorizontal: spacing.lg,
		paddingTop: spacing.xxs,
		paddingBottom: spacing.xl,
	},

	fieldContainer: {
		flex: 1,
		width: undefined,
		marginBottom: spacing.none,
	},

	card: {
		backgroundColor: colors.cardBackground,
		width: "100%",
		borderRadius: radius.lg,
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.sm,
	},

	title: {
		fontSize: typography.title,
		color: colors.text,
		marginTop: spacing.xl,
		marginBottom: spacing.lg,
	},

	editingContainer: {
		width: "100%",
		paddingVertical: spacing.sm,
	},

	editActions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		gap: spacing.md,
		marginTop: spacing.md,
	},

	editButton: {
		alignItems: "center",
		justifyContent: "center",
		minWidth: 44,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
		borderRadius: typography.body,
		backgroundColor: colors.cardForeGround,
		marginTop: spacing.none,
	},

	editText: {
		fontSize: typography.body,
		color: colors.text,
	},

	actionButton: {
		alignItems: "center",
		justifyContent: "center",
		minWidth: 96,
		minHeight: 44,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
		borderRadius: radius.md,
	},

	cancelButton: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: colors.textSecondary,
	},

	saveButton: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
		borderRadius: typography.body,
		backgroundColor: colors.text,
		marginTop: spacing.none,
	},

	cancelButtonText: {
		color: colors.text,
		fontSize: typography.body,
		fontWeight: "600",
	},

	saveText: {
		color: colors.background,
		fontSize: typography.body,
		fontWeight: "600",
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		minHeight: 56,
		gap: spacing.sm,
	},

	input: {
		fontSize: typography.body,
		paddingVertical: spacing.sm,
	},

	label: {
		fontSize: typography.bodyLarge,
		color: colors.text,
		fontWeight: "bold",
		marginTop: spacing.lg,
	},

	text: {
		fontSize: typography.bodyLarge,
		fontWeight: "300",
		color: colors.text,
	},

	divider: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: colors.cardForeGround,
		marginTop: spacing.xxs,
	},

	deleteButtonContainer: {
		alignItems: "center",
		paddingBottom: spacing.lg,
	},

	deleteAccountButton: {
		width: "auto",
		backgroundColor: colors.alert,
	},

	deleteText: {
		fontSize: typography.title,
		fontWeight: "bold",
		color: colors.text,
	},
});
