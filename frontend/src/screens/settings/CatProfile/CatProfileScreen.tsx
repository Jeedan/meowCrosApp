import FormInput from "@/components/forms/FormInput";
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
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

// TODO:
// Gender should be 2 buttons
// Goal should be 3 buttons and the current active goal should be of the primary color and the others in standard transparent
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
		{ name: "sex", label: "Gender", text: profile.sex },
		{
			name: "isNeutered",
			label: "Neutered status",
			text: profile.isNeutered ? "Neutered" : "Not Neutered",
		},
		{ name: "weight", label: "Current Weight", text: profile.weight },
		{ name: "goal", label: "Goal", text: profile.goal },
	] as const;

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

	// TODO: refactor
	async function saveField(item: (typeof catProfileOptions)[number]) {
		const isValid = await trigger(item.name);
		if (!isValid) return;

		const value = getValues(item.name);

		console.log("save edit:", value);
		setProfile((prev) => ({
			...profile,
			[item.name]: value,
		}));
		setEditingField(null);
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
							<View style={styles.row}>
								{editingField === item.name ? (
									<>
										{/* TODO: Only use the forminputs for Name, Weight, Age */}
										{/* Goal, Neutered and Gender will use the FormSelect buttons */}
										{/* so we render based on a conditional. */}
										{/* TODO: extract the edit forminputs into its own component to clean up and make it easier to see whats going on  */}
										<FormInput
											name={item.name}
											fieldContainerStyle={
												styles.fieldContainer
											}
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

										<Pressable
											onPress={() => {
												resetField(item.name, {
													defaultValue: item.text,
												});
												setEditingField(null);
											}}
										>
											<Ionicons
												name="close"
												size={icons.sizeM}
												color={colors.alert}
											/>
										</Pressable>

										<Pressable
											onPress={() => saveField(item)}
										>
											<Ionicons
												name="checkmark"
												size={icons.sizeM}
												color={colors.primary}
											/>
										</Pressable>
									</>
								) : (
									<>
										<View style={styles.fieldContainer}>
											<Text style={styles.text}>
												{item.text}
											</Text>
										</View>

										<Pressable
											onPress={() =>
												setEditingField(item.name)
											}
										>
											<Ionicons
												name="pencil-sharp"
												size={icons.sizeS}
												color={colors.text}
											/>
										</Pressable>
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
		paddingVertical: 40,
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

	row: {
		flexDirection: "row",
		alignItems: "center",
		minHeight: 56,
		gap: 8,
	},

	input: {},

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
		backgroundColor: "#414141",
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
