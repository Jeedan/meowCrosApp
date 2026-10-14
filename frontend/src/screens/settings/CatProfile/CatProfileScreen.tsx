import Button from "@/components/Button";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import FormSwitch from "@/components/forms/FormSwitch";
import { catProfile } from "@/data/dummyData";
import { colors, icons } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	CatProfileSettingsData,
	catProfileSettingsFormSchema,
} from "@shared/index";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

export default function CatProfileScreen() {
	const [profile, setProfile] = useState({
		name: catProfile.name ?? "",
		ageMonths: catProfile.ageMonths ?? "",
		weight: catProfile.weight ?? "",
		sex: catProfile.sex ?? "female",
		isNeutered: catProfile.isNeutered ?? false,
		goal: catProfile.goal ?? "maintain",
	});

	const catProfileOptions = [
		{ name: "name", label: "Name", text: profile.name },
		{ name: "ageMonths", label: "Age", text: profile.ageMonths },
		{
			name: "weight",
			label: "Current Weight",
			text: profile.weight + " kg",
		},
		{ name: "sex", label: "Gender", text: profile.sex },
		{
			name: "isNeutered",
			label: "Neutered status",
			text: profile.isNeutered ? "Neutered" : "Not Neutered",
		},
		{ name: "goal", label: "Goal", text: profile.goal },
	] as const;

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

	const { control, trigger, resetField, getValues } =
		useForm<CatProfileSettingsData>({
			defaultValues: {
				name: catProfile.name ?? "",
				ageMonths: catProfile.ageMonths ?? "",
				weight: catProfile.weight ?? "",
				sex: catProfile.sex ?? "female",
				isNeutered: catProfile.isNeutered ?? false,
				goal: catProfile.goal ?? "maintain",
			},
			resolver: zodResolver(catProfileSettingsFormSchema),
		});

	// Todo make this more reusable
	const [editingField, setEditingField] = useState<
		"name" | "ageMonths" | "weight" | "sex" | "isNeutered" | "goal" | null
	>(null);

	// TODO: send save request to the backend when its setup
	async function saveField(item: (typeof catProfileOptions)[number]) {
		const isValid = await trigger(item.name);
		if (!isValid) return;

		const value = getValues(item.name);

		console.log("save edit:", value);
		setProfile((prev) => ({
			...prev,
			[item.name]: value,
		}));
		setEditingField(null);
	}

	function renderEditor(item: (typeof catProfileOptions)[number]) {
		switch (item.name) {
			case "name":
			case "ageMonths":
			case "weight":
				return (
					<>
						<FormInput
							name={item.name}
							fieldContainerStyle={styles.fieldContainer}
							inputStyle={styles.input}
							placeholder={`Enter ${item.label}`}
							keyboardType={
								item.name === "weight" ||
								item.name === "ageMonths"
									? "numeric"
									: "default"
							}
							control={control}
						/>
					</>
				);
			case "sex":
				return (
					//TODO: redesign cancel/save buttons, right now it looks cramped
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
					//TODO: redesign cancel/save buttons, right now it looks cramped
					<FormSwitch
						control={control}
						name="isNeutered"
						label="Neutered status"
						fieldContainerStyle={styles.fieldContainer}
					/>
				);
			case "goal":
				return (
					//TODO: redesign cancel/save buttons, right now it looks cramped
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
			behavior={Platform.OS === "ios" ? "padding" : "height"}
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
													resetField(item.name, {
														defaultValue:
															profile[item.name],
													});
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
	container: {
		flexGrow: 1,
		alignItems: "flex-start",
		backgroundColor: colors.background,
		paddingHorizontal: 16,
		paddingTop: 2,
		paddingBottom: 20,
	},

	fieldContainer: {
		flex: 1,
		width: undefined,
		marginBottom: 0,
	},

	card: {
		backgroundColor: colors.cardBackground,
		width: "100%",
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 6,
	},

	title: {
		fontSize: 20,
		color: colors.text,
		marginTop: 20,
		marginBottom: 16,
	},

	editingContainer: {
		width: "100%",
		paddingVertical: 8,
	},

	editActions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		gap: 12,
		marginTop: 12,
	},

	editButton: {
		alignItems: "center",
		justifyContent: "center",
		minWidth: 44,
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 15,
		backgroundColor: colors.cardForeGround,
		marginTop: 0,
	},

	editText: {
		fontSize: 16,
		color: colors.text,
	},

	actionButton: {
		minWidth: 96,
		minHeight: 44,
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
	},

	cancelButton: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: colors.textSecondary,
	},

	saveButton: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 15,
		backgroundColor: colors.text,
		marginTop: 0,
	},

	cancelButtonText: {
		color: colors.text,
		fontSize: 15,
		fontWeight: "600",
	},

	saveText: {
		color: colors.background,
		fontSize: 15,
		fontWeight: "600",
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		minHeight: 56,
		gap: 8,
	},

	input: {
		fontSize: 16,
		paddingVertical: 8,
	},

	label: {
		fontSize: 18,
		color: colors.text,
		fontWeight: "bold",
		marginTop: 16,
	},

	text: {
		fontSize: 18,
		fontWeight: "300",
		color: colors.text,
	},

	divider: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: colors.cardForeGround,
	},

	deleteButtonContainer: {
		alignItems: "center",
		paddingBottom: 16,
	},

	deleteAccountButton: {
		width: "auto",
		backgroundColor: colors.alert,
	},

	deleteText: {
		fontSize: 20,
		fontWeight: "bold",
		color: colors.text,
	},
});
