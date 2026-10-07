import { userProfile } from "@/data/dummyData";
import { colors, icons } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
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
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Profile</Text>

			<View style={styles.card}>
				{accountOptions.map((item, index) => (
					<View key={item.text + index}>
						<Text style={styles.label}>{item.label}</Text>
						<View style={styles.row}>
							<Text style={styles.text}>{item.text}</Text>

							{/* TODO: when clicked change the text field into an input field for editing.  
							Store saved input */}
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
