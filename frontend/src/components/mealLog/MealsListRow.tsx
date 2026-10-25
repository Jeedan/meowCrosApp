import React, { Profiler } from "react";
import { View } from "react-native";
import type { FeedingLog, PlateItem } from "@shared/types/meal";

import CalorieSummary from "./CalorieSummary";
import DashboardFeedingHeader from "../dashboard/DashboardFeedingHeader";
import DashboardPlateItem from "../dashboard/DashboardPlateItem";
import { SharedValue } from "react-native-reanimated";

export type MealsListItem =
	| { type: "summary"; id: "calorie-summary" }
	| { type: "feedingHeader"; id: string; log: FeedingLog }
	| {
			type: "plate";
			id: string;
			meal: PlateItem;
			feedingLogId: string;
	  };

type MealsListRowProps = {
	item: MealsListItem;
	caloriesConsumed: number;
	caloriesRemaining: number;
	totalDailyCalories: number;
	openSwipeRowId: SharedValue<string | null>;
	onRequestDelete: (feedingLogId: string, mealId: string) => void;
};

function MealsListRow({
	item,
	caloriesConsumed,
	caloriesRemaining,
	totalDailyCalories,
	onRequestDelete,
	openSwipeRowId,
}: MealsListRowProps) {
	if (item.type === "summary") {
		return (
			<CalorieSummary
				caloriesConsumed={caloriesConsumed}
				caloriesRemaining={caloriesRemaining}
				totalDailyCalories={totalDailyCalories}
			/>
		);
	}
	if (item.type === "feedingHeader") {
		return (
			<View style={{ alignItems: "center", paddingHorizontal: 16 }}>
				<DashboardFeedingHeader feedingLog={item.log} />
			</View>
		);
	}
	return (
		<View style={{ alignItems: "center", paddingHorizontal: 16 }}>
			<DashboardPlateItem
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
