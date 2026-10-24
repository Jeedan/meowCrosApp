import React from "react";
import CalorieSummary from "./CalorieSummary";
import { View } from "react-native";
import DashboardFeedingHeader from "../dashboard/DashboardFeedingHeader";
import DashboardPlateItem from "../dashboard/DashboardPlateItem";

type MealsListItem =
	| {
			type: "summary";
			id: string;
	  }
	| {
			type: "feedingHeader";
			id: string;
			log: import("@shared/types/meal").FeedingLog;
	  }
	| {
			type: "plateItem";
			id: string;
			meal: import("@shared/types/meal").PlateItem;
			feedinglogId: string;
	  };

type MealsListRowProps = {
	item: MealsListItem;
	caloriesConsumed: number;
	caloriesRemaining: number;
	totalDailyCalories: number;
};

// currently unused
function MealsListRow({
	item,
	caloriesConsumed,
	caloriesRemaining,
	totalDailyCalories,
}: MealsListRowProps) {
	console.count(`[MealsListRow] ${item.type} ${item.id}`);
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
				feedingLogId={item.feedinglogId}
				meal={item.meal}
			/>
		</View>
	);
}

export default React.memo(MealsListRow);
