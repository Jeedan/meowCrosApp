import { useFeedingLog } from "@/store/store";
import { colors, icons, radius, spacing, typography } from "@/styles/global";
import { PlateItem } from "@shared/types/meal";
import { StyleSheet, Text, View } from "react-native";

import SharedSwipeRow from "../gestures/SharedSwipeRow";
import React from "react";

type DashboardPlateItemProps = {
	meal: PlateItem;
	feedingLogId: string;
};

function PlateContent({ meal }: { meal: PlateItem }) {
	return (
		<View style={styles.mealsContainer}>
			<Text style={styles.mealsHeader}>{meal.foodNameSnapshot}</Text>
			<Text style={styles.mealText}>
				{meal.gramsServed}g • {meal.kcalCalculated}kcal
			</Text>
		</View>
	);
}

function DashboardPlateItem({ meal, feedingLogId }: DashboardPlateItemProps) {
	const removePlateItem = useFeedingLog((state) => state.removePlateItem);

	return (
		<SharedSwipeRow onDelete={() => removePlateItem(feedingLogId, meal.id)}>
			<PlateContent meal={meal} />
		</SharedSwipeRow>
		// <View>
		// 	<PlateContent meal={meal} />
		// </View>
	);
}

export default React.memo(DashboardPlateItem);

const styles = StyleSheet.create({
	swipeable: {
		width: 300,
	},

	mealsContainer: {
		width: 300,
		height: 72,
		justifyContent: "center",
		backgroundColor: colors.cardBackground,
		borderColor: colors.textSecondary,
		borderRadius: radius.xl,
		borderWidth: 0,
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.lg,
		marginBottom: spacing.xs,
	},

	mealsHeader: {
		fontSize: typography.body,
		fontWeight: "600",
		color: colors.text,
		marginBottom: spacing.xs,
	},

	mealText: {
		fontSize: typography.caption,
		fontWeight: "600",
		color: colors.textSecondary,
		marginBottom: spacing.xs,
	},
	deleteButton: {
		backgroundColor: colors.alert,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.md,
		borderRadius: radius.xl,
	},
});
