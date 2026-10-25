import { colors, radius, spacing, typography } from "@/styles/global";
import { PlateItem } from "@shared/types/meal";
import { StyleSheet, Text, View } from "react-native";

import SharedSwipeRow from "../gestures/SharedSwipeRow";
import React from "react";
import { SharedValue } from "react-native-reanimated";

type DashboardPlateItemProps = {
	meal: PlateItem;
	feedingLogId: string;
	onRequestDelete: (feedingLogId: string, mealId: string) => void;
	openSwipeRowId: SharedValue<string | null>;
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

function DashboardPlateItem({
	meal,
	feedingLogId,
	onRequestDelete,
	openSwipeRowId,
}: DashboardPlateItemProps) {
	return (
		<SharedSwipeRow
			rowId={meal.id}
			onDeletePress={() => onRequestDelete(feedingLogId, meal.id)}
			openSwipeRowId={openSwipeRowId}
		>
			<PlateContent meal={meal} />
		</SharedSwipeRow>
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
		borderRadius: radius.lg,
		borderWidth: 0,
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.lg,
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
