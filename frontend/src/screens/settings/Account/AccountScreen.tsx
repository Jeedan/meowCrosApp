import { colors } from "@/styles/global";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AccountScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.text}>Profile</Text>
				<Text style={styles.text}>Username</Text>
				<Text style={styles.text}>Email</Text>
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

	text: {
		fontSize: 18,
		color: colors.text,
	},

	divider: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: "#414141",
	},
});
