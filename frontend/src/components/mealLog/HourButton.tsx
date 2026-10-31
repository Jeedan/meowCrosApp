import { colors, icons, spacing, typography } from "@/styles/global";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../Button";
import { Ionicons } from "@expo/vector-icons";

type HourButtonProps = {
	label: string;
};

export default function HourButton({ label }: HourButtonProps) {
	return (
		<View style={styles.row}>
			<View style={styles.card}>
				<Text style={styles.label}>{label}</Text>
			</View>
			<Button
				style={styles.buttonStyle}
				onPress={() => console.log("pressed: ", label)}
			>
				<Ionicons
					name="add-outline"
					size={icons.md}
					color={colors.text}
				/>
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		marginTop: spacing.xs,
		marginBottom: spacing.md,
		gap: 2,
	},

	card: {
		backgroundColor: colors.cardBackground,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.xs,
		borderRadius: 12,
	},

	label: {
		color: colors.text,
		fontSize: typography.body,
	},

	buttonStyle: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.cardBackground,
		paddingVertical: 2,
		paddingHorizontal: 4,
		borderRadius: 99,
	},
});
