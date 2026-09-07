import { colors, icons } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { FeedingLog } from "@shared/types/meal";
import { StyleSheet, Text, View } from "react-native";
import ReanimatedSwipeable, {
	SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import SwipeAction from "../gestures/SwipeAction";
import DashboardPlateItem from "./DashboardPlateItem";
import { useFeedingLog } from "@/store/store";

type DashboardFeedingProps = {
	feedingLog: FeedingLog;
};

export default function DashboardFeeding({
	feedingLog,
}: DashboardFeedingProps) {
	const removeMeal = useFeedingLog((state) => state.removeMeal);

	// TODO remove an entire feeding log if swiping on time
	const handlerDelete = (swipeable: SwipeableMethods) => {
		swipeable.close();
		// removes an entire feeding log at the moment
		console.log("delete feeding: ", feedingLog.id);
		removeMeal(feedingLog.id);
	};

	// only try to calculate if there are plate entries.
	const plateCalories =
		feedingLog.plate.length > 0
			? feedingLog.plate.reduce(
					(acc, meal) => acc + meal.kcalCalculated,
					0,
				)
			: 0;

	return (
		<View style={styles.feedingContainer}>
			{/* display loggedAt time: */}
			<View style={styles.headerContainer}>
				<Text style={styles.mealsHeader}>
					{feedingLog.loggedAt.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
						hour12: false,
					})}
				</Text>
				<View style={styles.calorieContainer}>
					<Ionicons
						name="flame-sharp"
						size={icons.sizeXS}
						color={colors.text}
					/>
					<Text style={styles.calorieText}>{plateCalories} kcal</Text>
				</View>
			</View>

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
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},

	mealsHeader: {
		fontSize: 16,
		fontWeight: "400",
		color: colors.text,
	},

	mealsContainer: {
		borderColor: colors.textSecondary,
		backgroundColor: colors.cardBackground,
		borderRadius: 14,
		borderWidth: 0,
		padding: 12,
		marginBottom: 8,
	},

	calorieContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},

	calorieText: {
		color: colors.text,
	},

	deleteButton: {
		backgroundColor: colors.alert,
		paddingVertical: 12,
		paddingHorizontal: 12,
		borderRadius: 14,
	},

	divider: {
		borderWidth: 0.2,
		borderColor: colors.textSecondary,
	},
});
