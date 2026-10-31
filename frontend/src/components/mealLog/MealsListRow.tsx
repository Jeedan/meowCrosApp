import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { FeedingLog, PlateItem } from "@shared/types/meal";

import CalorieSummary from "./CalorieSummary";
import FeedingHeader from "./FeedingHeader";
import { SharedValue } from "react-native-reanimated";
import FeedingPlateItem from "./FeedingPlateItem";
import { spacing } from "@/styles/global";
import Button from "../Button";
import HourButton from "./HourButton";

export type MealsListItem =
	| {
			type: "hourButton";
			id: string;
			hour: string;
	  }
	| {
			type: "summary";
			id: "calorie-summary";
			caloriesConsumed: number;
			caloriesRemaining: number;
			totalDailyCalories: number;
	  }
	| { type: "feedingHeader"; id: string; log: FeedingLog }
	| {
			type: "plate";
			id: string;
			meal: PlateItem;
			feedingLogId: string;
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
		return <HourButton label={item.hour} />;
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

	if (item.type === "feedingHeader") {
		return (
			<View style={styles.feedingHeader}>
				<FeedingHeader feedingLog={item.log} />
			</View>
		);
	}

	return (
		<View style={styles.feedingPlateItem}>
			<FeedingPlateItem
				feedingLogId={item.feedingLogId}
				meal={item.meal}
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
		marginTop: spacing.lg,
		marginBottom: spacing.sm,
	},

	feedingPlateItem: { alignItems: "center", paddingHorizontal: spacing.lg },
});

export default React.memo(MealsListRow);
