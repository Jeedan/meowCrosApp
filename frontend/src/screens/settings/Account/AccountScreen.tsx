import FormInput from "@/components/forms/FormInput";
import { userProfile } from "@/data/dummyData";
import { colors, icons } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountCreationFormSchema, AccountFormData } from "@shared/index";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";

// TODO: hide password if the user signed up via email and password
// set to no password if they used oAUTH
const accountOptions = [
	{ label: "Name", text: userProfile.name },
	{ label: "Email", text: userProfile.email },
	{ label: "Password", text: "no password" },
];

// TODO: when edit is enabled, swap the text with an inputfield. The row should then consist of
// input field ---- Cancel Save
// cancel and save will be icons
// when cancel is hit set "editMode" to false and just showcase the standard UI
export default function AccountScreen() {
	// fields for individual editing
	// null for normal display only
	const [editingField, setEditingField] = useState<
		"name" | "email" | "password" | null
	>(null);

	// TODO: rethink accountcreateformdata or create a new formdata specific for after an account has already been created.
	const { control, handleSubmit } = useForm({
		defaultValues: {
			name: userProfile.name ?? "",
			email: userProfile.email ?? "",
			password: userProfile.password ?? "",
		},
	});

	{
		/* TODO: when clicked change the text field into an input field for editing.  
							Store saved input */
	}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Profile</Text>

			<View style={styles.card}>
				{accountOptions.map((item, index) => (
					<View key={item.text + index}>
						{/* <Text style={styles.label}>{item.label}</Text> */}
						<View style={styles.row}>
							{/* <Text style={styles.text}>{item.text}</Text> */}
							{/* i don't want the input to be massive width */}
							<FormInput
								name={"name"}
								label={item.label}
								placeholder={`Enter ${item.label}`}
								control={control}
							/>
							<Pressable
								onPress={() =>
									console.log("pressed: ", item.text)
								}
							>
								<Ionicons
									name="pencil-sharp"
									size={icons.sizeS}
									color={colors.text}
								/>
							</Pressable>
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

	card: {
		backgroundColor: colors.cardBackground,
		width: "100%",
		borderRadius: 12,
		paddingHorizontal: 16,
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
		justifyContent: "space-between",
		minHeight: 56,
		gap: 8,
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
		backgroundColor: "#414141",
	},
});
