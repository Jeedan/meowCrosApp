import React from "react";
import { View } from "react-native";
import type { FeedingLog, PlateItem } from "@shared/types/meal";

import CalorieSummary from "./CalorieSummary";
import FeedingHeader from "./FeedingHeader";
import { SharedValue } from "react-native-reanimated";
import FeedingPlateItem from "./FeedingPlateItem";

export type MealsListItem =
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
			<View style={{ alignItems: "center", paddingHorizontal: 16 }}>
				<FeedingHeader feedingLog={item.log} />
			</View>
		);
	}
	return (
		<View style={{ alignItems: "center", paddingHorizontal: 16 }}>
			<FeedingPlateItem
				feedingLogId={item.feedingLogId}
				meal={item.meal}
				onRequestDelete={onRequestDelete}
				openSwipeRowId={openSwipeRowId}
			/>
		</View>
	);
	// return (
	// 	<View
	// 		style={{
	// 			marginHorizontal: 16,
	// 			marginBottom: 12,
	// 			height: item.type === "summary" ? 70 : 72,
	// 			borderRadius: 12,
	// 			backgroundColor: "#333333",
	// 		}}
	// 	/>
	// );
}

export default React.memo(MealsListRow);
