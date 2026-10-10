import FormInput from "@/components/forms/FormInput";
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
import { Pressable, StyleSheet, Text, View } from "react-native";
import { string } from "zod/v3";

// TODO: when edit is enabled, swap the text with an inputfield. The row should then consist of
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

	// TODO: rethink accountcreateformdata or create a new formdata specific for after an account has already been created.
	const { control, handleSubmit, resetField, getValues, trigger } =
		useForm<AccountSettingsData>({
			defaultValues: {
				name: profile.name ?? "",
				email: profile.email ?? "",
				password: "",
			},
			resolver: zodResolver(accountSettingsFormSchema),
		});

	async function saveField(item: (typeof accountOptions)[number]) {
		const isValid = await trigger(item.name);
		if (!isValid) return;

		const value = getValues(item.name);
		// validation

		// save and close editing
		console.log("save edit:", value);
		setProfile((prev) => ({ ...prev, [item.name]: value }));
		setEditingField(null);
	}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Profile</Text>

			<View style={styles.card}>
				{accountOptions.map((item, index) => (
					<View key={item.text + index}>
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
										control={control}
									/>

									<Pressable
										onPress={() => {
											resetField(item.name, {
												keepTouched: true,
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

									<Pressable onPress={() => saveField(item)}>
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
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
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
});
