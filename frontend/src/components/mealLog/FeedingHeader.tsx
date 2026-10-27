import { colors, icons, radius, spacing, typography } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { FeedingLog } from "@shared/types/meal";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type FeedingHeaderProps = {
	feedingLog: FeedingLog;
};
// Displays log timestamp and calories above the meal card
function FeedingHeader({ feedingLog }: FeedingHeaderProps) {
	// only try to calculate if there are plate entries.
	const plateCalories =
		feedingLog.plate.length > 0
			? feedingLog.plate.reduce(
					(acc, meal) => acc + meal.kcalCalculated,
					0,
				)
			: 0;

	return (
		<View style={styles.headerContainer}>
			<View style={styles.dateContainer}>
				<Text style={styles.text}>
					{feedingLog.loggedAt.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
						hour12: false,
					})}
				</Text>
			</View>
			<View style={styles.calorieContainer}>
				<Ionicons
					name="flame-sharp"
					size={icons.sm}
					color={colors.text}
				/>
				<Text style={styles.text}>{plateCalories} kcal</Text>
			</View>
		</View>
	);
}
export default React.memo(FeedingHeader);

const styles = StyleSheet.create({
	headerContainer: {
		//width: 300,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	text: {
		fontSize: typography.body,
		fontWeight: "600",
		color: colors.text,
	},

	calorieContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.xs,
	},

	dateContainer: {
		backgroundColor: colors.cardBackground,
		borderColor: colors.textSecondary,
		borderWidth: 0.5,
		borderRadius: radius.lg,
		justifyContent: "center",
		alignItems: "center",
		width: 72,
	},
});
