import { catProfile } from "@/data/dummyData";
import { colors, globalStyles, icons } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
	FlatList,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

const accountOptions = [
	{ label: "Name", text: catProfile.name },
	{ label: "Age", text: catProfile.ageMonths },
	{ label: "Gender", text: catProfile.sex },
	{
		label: "Neutered status",
		text: catProfile.isNeutered ? "Neutered" : "Not Neutered",
	},
	{ label: "Current Weight", text: catProfile.weight },
	{ label: "Goal", text: catProfile.goal },
];

export default function CatProfileScreen() {
	return (
		<ScrollView
			contentContainerStyle={styles.scollContainer}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.container}>
				<Text style={styles.title}>Profile</Text>

				<View style={styles.card}>
					{accountOptions.map((item, index) => (
						<View key={item.label + index}>
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

				{/* TODO: edit button */}
				<View>
					<Text style={styles.text}>Edit Button</Text>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scollContainer: {
		backgroundColor: colors.background,
		paddingBottom: 20,
	},
	container: {
		justifyContent: "flex-start",
		alignItems: "flex-start",
		paddingHorizontal: 16,
	},

	card: {
		backgroundColor: colors.cardBackground,
		width: "100%",
		borderRadius: 12,
		paddingHorizontal: 16,
		marginBottom: 10,
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
