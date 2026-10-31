import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { FeedingLog, PlateItem } from "@shared/types/meal";

import CalorieSummary from "./CalorieSummary";
import { SharedValue } from "react-native-reanimated";
import FeedingPlateItem from "./FeedingPlateItem";
import { spacing } from "@/styles/global";
import HourButton from "./HourButton";

export type MealsListItem =
	| {
			type: "hourButton";
			id: string;
			hour: string;
			currentDate: Date;
			totalCalories: number;
	  }
	| {
			type: "summary";
			id: "calorie-summary";
			caloriesConsumed: number;
			caloriesRemaining: number;
			totalDailyCalories: number;
	  }
	| {
			type: "plate";
			id: string;
			meal: PlateItem;
			log: FeedingLog;
	  };

type MealsListRowProps = {
	item: MealsListItem;
	openSwipeRowId: SharedValue<string | null>;
	onRequestDelete: (feedingLogId: string, mealId: string) => void;
};

function MealsListRow({
	item,
	onRequestDelete,
	openSwipeRowId,
}: MealsListRowProps) {
	if (item.type === "hourButton") {
		return (
			<HourButton
				label={item.hour}
				totalCalories={item.totalCalories}
				currentDate={item.currentDate}
			/>
		);
	}

	if (item.type === "summary") {
		return (
			<CalorieSummary
				caloriesConsumed={item.caloriesConsumed}
				caloriesRemaining={item.caloriesRemaining}
				totalDailyCalories={item.totalDailyCalories}
			/>
		);
	}

	return (
		<View style={styles.feedingPlateItem}>
			<FeedingPlateItem
				meal={item.meal}
				log={item.log}
				onRequestDelete={onRequestDelete}
				openSwipeRowId={openSwipeRowId}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	feedingHeader: {
		alignItems: "center",
		paddingHorizontal: spacing.lg,
		marginBottom: spacing.sm,
	},

	feedingPlateItem: { alignItems: "center" },
});

export default React.memo(MealsListRow);
