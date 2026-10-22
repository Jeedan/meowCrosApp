import { colors, radius, spacing } from "@/styles/global";
import { FeedingLog } from "@shared/types/meal";
import { StyleSheet, View } from "react-native";
import DashboardPlateItem from "./DashboardPlateItem";
import { useFeedingLog } from "@/store/store";
// import { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";

type DashboardFeedingProps = {
	feedingLog: FeedingLog;
};

export default function DashboardFeeding({
	feedingLog,
}: DashboardFeedingProps) {
	const removeMeal = useFeedingLog((state) => state.removeFeeding);

	// // TODO remove an entire feeding log if swiping on time
	// const handlerDelete = (swipeable: SwipeableMethods) => {
	// 	swipeable.close();
	// 	// removes an entire feeding log
	// 	console.log("delete feeding: ", feedingLog.id);
	// 	removeMeal(feedingLog.id);
	// };

	return (
		<View style={styles.feedingContainer}>
			<View style={styles.mealsContainer}>
				{feedingLog.plate.map((meal) => (
					<DashboardPlateItem
						feedingLogId={feedingLog.id}
						meal={meal}
						key={meal.id}
					/>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	feedingContainer: {
		width: 300,
	},

	mealsContainer: {
		borderColor: colors.textSecondary,
		backgroundColor: colors.cardBackground,
		borderRadius: radius.xl,
		borderWidth: spacing.none,
		padding: spacing.md,
		marginBottom: spacing.sm,
	},
});
