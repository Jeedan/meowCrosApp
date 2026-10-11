import Button from "@/components/Button";
import FormInput from "@/components/forms/FormInput";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import { foodItems, userProfile } from "@/data/dummyData";
import { colors, icons } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	accountCreationFormSchema,
	AccountFormData,
	AccountSettingsData,
	accountSettingsFormSchema,
} from "@shared/index";
import { preventAutoHideAsync } from "expo-router/build/utils/splash";
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
import { string } from "zod/v3";

// input field ---- Cancel Save
// cancel and save will be icons
// when cancel is hit set "editMode" to false and just showcase the standard UI
export default function AccountScreen() {
	// grab profile info from dummy data
	const [profile, setProfile] = useState({
		name: userProfile.name ?? "",
		email: userProfile.email ?? "",
		password: "",
	});

	// TODO: hide password if the user signed up via email and password
	// set to no password if they used oAUTH
	const accountOptions = [
		{ name: "name", label: "Name", text: profile.name },
		{ name: "email", label: "Email", text: profile.email },
		{ name: "password", label: "Password", text: "********" },
	] as const;

	// fields for individual editing
	// null for normal display only
	const [editingField, setEditingField] = useState<
		"name" | "email" | "password" | null
	>(null);

	const { control, handleSubmit, resetField, getValues, trigger } =
		useForm<AccountSettingsData>({
			defaultValues: {
				name: profile.name ?? "",
				email: profile.email ?? "",
				password: "",
			},
			resolver: zodResolver(accountSettingsFormSchema),
		});

	// manually validate each input with trigger
	// otherwise we will set off zod errors requiring each fields error parsing
	async function saveField(item: (typeof accountOptions)[number]) {
		// validation
		const isValid = await trigger(item.name);
		if (!isValid) return;

		const value = getValues(item.name);

		// save and close editing
		console.log("save edit:", value);
		setProfile((prev) => ({ ...prev, [item.name]: value }));
		setEditingField(null);
	}
	return (
		// keyboardVerticalOffset={100} works but white
		// keyboard offsetting isn't working
		// might need app rebuild
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
					{accountOptions.map((item, index) => (
						<View key={item.name}>
							<Text style={styles.label}>{item.label}</Text>
							<View style={styles.row}>
								{editingField === item.name ? (
									<>
										<FormInput
											name={item.name}
											fieldContainerStyle={
												styles.fieldContainer
											}
											inputStyle={styles.input}
											placeholder={`Enter ${item.label}`}
											keyboardType={
												item.name === "email"
													? "email-address"
													: "default"
											}
											secureTextEntry={
												item.name === "password"
											}
											control={control}
										/>

										<Pressable
											onPress={() => {
												resetField(item.name, {
													defaultValue:
														item.name === "password"
															? ""
															: item.text,
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
							{index < accountOptions.length - 1 && (
								<View style={styles.divider} />
							)}
						</View>
					))}

					<View style={styles.buttonContainer}>
						<ConfirmDeleteModal
							onConfirm={() =>
								console.log(
									"sending delete request to the backend",
								)
							}
							modalText="Do you want to delete the entry?"
							style={styles.deleteAccount}
						>
							<Text style={styles.deleteText}>
								Delete Account
							</Text>
						</ConfirmDeleteModal>
					</View>
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

	deleteAccount: {
		width: "auto",
		backgroundColor: colors.alert,
	},

	deleteText: {
		fontSize: 20,
		fontWeight: "bold",
		color: colors.text,
	},
	buttonContainer: {
		alignItems: "center",
		paddingBottom: 16,
	},
});
