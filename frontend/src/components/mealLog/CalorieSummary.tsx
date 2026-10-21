import { colors, radius, spacing, typography } from "@/styles/global";
import React from "react";
import { StyleSheet } from "react-native";
import { Animated, Text, View } from "react-native";

/* 3 cards in a row */
/* Calories consumed | Remaining | Daily Goal */
/* copy the calculations like in DashboardScreen, move them into their own component */
/* Index [i]: Sticky calorie summary */
/* Sticky wrapper: no animated style */

type CalorieSummaryProps = {
	caloriesConsumed: number;
	caloriesRemaining: number;
	totalDailyCalories: number;
};

export default function CalorieSummary({
	caloriesConsumed,
	caloriesRemaining,
	totalDailyCalories,
}: CalorieSummaryProps) {
	return (
		<View>
			{/* Your existing three calorie cards */}
			<View style={[styles.rowContainer]}>
				<View style={[styles.calorieContainer]}>
					<View style={styles.calorieCardContent}>
						<Text numberOfLines={1} style={[styles.calorieValue]}>
							{caloriesConsumed}
						</Text>
						<Text numberOfLines={1} style={styles.calorieText}>
							consumed
						</Text>
					</View>
				</View>
				<View style={[styles.calorieContainer]}>
					<View style={styles.calorieCardContent}>
						<Text numberOfLines={1} style={[styles.calorieValue]}>
							{caloriesRemaining}
						</Text>
						<Text numberOfLines={1} style={styles.calorieText}>
							remaining
						</Text>
					</View>
				</View>
				<Animated.View style={[styles.calorieContainer]}>
					<View style={styles.calorieCardContent}>
						<Animated.Text
							numberOfLines={1}
							style={[styles.calorieValue]}
						>
							{totalDailyCalories}
						</Animated.Text>
						<Text numberOfLines={1} style={styles.calorieText}>
							goal
						</Text>
					</View>
				</Animated.View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	rowContainer: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: spacing.sm,
		backgroundColor: colors.cardBackground,
		padding: spacing.sm,
	},

	calorieContainer: {
		flex: 1,
		minWidth: 0,
		borderRadius: radius.md,
		overflow: "hidden",
		backgroundColor: colors.primary,
	},

	calorieCardContent: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: spacing.xs,
		width: "100%",
		padding: spacing.sm,
	},

	calorieValue: {
		color: colors.text,
		fontSize: typography.bodyLarge,
		fontWeight: "600",
	},

	calorieText: {
		color: colors.text,
		fontWeight: "400",
		fontSize: typography.caption,
	},
});
