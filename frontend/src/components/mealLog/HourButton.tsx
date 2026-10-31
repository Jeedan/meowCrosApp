import { colors, icons, radius, spacing, typography } from "@/styles/global";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../Button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { timeStampHourDate } from "@/utils/dateUtils";

type HourButtonProps = {
	label: string;
	totalCalories: number;
	currentDate: Date;
};

export default function HourButton({
	label,
	totalCalories,
	currentDate,
}: HourButtonProps) {
	const renderCalories = () => {
		if (totalCalories === 0) {
			return;
		}

		return (
			<View style={styles.calorieContainer}>
				<Ionicons
					name="flame-sharp"
					size={icons.sm}
					color={colors.text}
				/>
				<Text style={styles.label}>{totalCalories} kcal</Text>
			</View>
		);
	};

	const onPressHandler = () => {
		console.log("pressed: ", label);
		//TODO: pass the button hour
		// to generate timeStamp

		const logDate = timeStampHourDate(currentDate, label);
		console.log("logged At: ", logDate.toLocaleString());

		router.push({
			pathname: "/addmeal",
			params: {
				loggedAt: logDate.toISOString(),
			},
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<View style={styles.card}>
					<Text style={styles.label}>{label}</Text>
				</View>
				<Button
					style={styles.buttonStyle}
					onPress={() => onPressHandler()}
				>
					<Ionicons
						name="add-outline"
						size={icons.md}
						color={colors.text}
					/>
				</Button>
			</View>

			{renderCalories()}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: spacing.xs,
		marginBottom: spacing.md,
		paddingHorizontal: spacing.xs,
	},
	row: {
		flex: 1,
		flexDirection: "row",
		gap: spacing.xxs,
	},

	card: {
		backgroundColor: colors.cardBackground,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.xs,
		borderRadius: radius.lg,
	},

	label: {
		color: colors.text,
		fontSize: typography.body,
		fontWeight: "500",
	},

	buttonStyle: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.cardBackground,
		paddingVertical: spacing.xxs,
		paddingHorizontal: spacing.xs,
		borderRadius: radius.pill,
	},
	calorieContainer: {
		flexDirection: "row",
		alignItems: "baseline",
		gap: spacing.xs,
	},
});
