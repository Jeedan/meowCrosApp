import React, { Profiler } from "react";
import { View } from "react-native";
import type { FeedingLog, PlateItem } from "@shared/types/meal";

import CalorieSummary from "./CalorieSummary";
import DashboardFeedingHeader from "../dashboard/DashboardFeedingHeader";
import DashboardPlateItem from "../dashboard/DashboardPlateItem";

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
	onRequestDelete: (feedingLogId: string, mealId: string) => void;
};

function MealsListRow({
	item,
	caloriesConsumed,
	caloriesRemaining,
	totalDailyCalories,
	onRequestDelete,
}: MealsListRowProps) {
	if (item.type === "summary") {
		return (
			<Profiler
				id="CalorieSummary"
				onRender={(_, phase, actualDuration) => {
					console.log(
						`[CalorieSummary] ${phase}: ${actualDuration.toFixed(1)}ms`,
					);
				}}
			>
				<CalorieSummary
					caloriesConsumed={caloriesConsumed}
					caloriesRemaining={caloriesRemaining}
					totalDailyCalories={totalDailyCalories}
				/>
			</Profiler>
		);
	}

	if (item.type === "feedingHeader") {
		return (
			<Profiler
				id="FeedingHeader"
				onRender={(_, phase, actualDuration) => {
					console.log(
						`[FeedingHeader] ${phase}: ${actualDuration.toFixed(1)}ms`,
					);
				}}
			>
				<View style={{ alignItems: "center", paddingHorizontal: 16 }}>
					<DashboardFeedingHeader feedingLog={item.log} />
				</View>
			</Profiler>
		);
	}

	return (
		<View style={{ alignItems: "center", paddingHorizontal: 16 }}>
			<Profiler
				id="PlateItem"
				onRender={(_, phase, actualDuration) => {
					console.log(
						`[PlateItem] ${phase}: ${actualDuration.toFixed(1)}ms`,
					);
				}}
			>
				<DashboardPlateItem
					feedingLogId={item.feedingLogId}
					meal={item.meal}
					onRequestDelete={onRequestDelete}
				/>
			</Profiler>
		</View>
	);
}

export default React.memo(MealsListRow);
