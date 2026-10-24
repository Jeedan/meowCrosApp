import DashboardFeedingHeader from "@/components/dashboard/DashboardFeedingHeader";
import DashboardPlateItem from "@/components/dashboard/DashboardPlateItem";
import type { FeedingLog } from "@shared/types/meal";
import React from "react";
import { View } from "react-native";

type Props = {
	feedingLog: FeedingLog;
	onRequestDelete: (feedingLogId: string, mealId: string) => void;
};

function FeedingLogItem({ feedingLog, onRequestDelete }: Props) {
	return (
		<View>
			<View
				style={{
					alignItems: "center",
					paddingHorizontal: 16,
				}}
			>
				<DashboardFeedingHeader feedingLog={feedingLog} />
			</View>

			{feedingLog.plate.map((meal) => (
				<View
					key={meal.id}
					style={{
						alignItems: "center",
						paddingHorizontal: 16,
					}}
				>
					<DashboardPlateItem
						feedingLogId={feedingLog.id}
						meal={meal}
						onRequestDelete={onRequestDelete}
					/>
				</View>
			))}
		</View>
	);
}
export default React.memo(FeedingLogItem);
