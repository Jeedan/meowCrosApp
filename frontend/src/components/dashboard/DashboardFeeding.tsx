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

	const handlerDelete = (swipeable: SwipeableMethods) => {
		swipeable.close();
		// removes an entire feeding log
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
		<ReanimatedSwipeable
			friction={2}
			enableTrackpadTwoFingerGesture
			rightThreshold={50}
			renderRightActions={(progress, drag, swipeable) => (
				<SwipeAction
					prog={progress}
					renderContent={() => {
						return (
							<ConfirmDeleteModal
								onConfirm={() => handlerDelete(swipeable)}
								modalText="Do you want to delete the entry?"
								style={styles.deleteButton}
							>
								<Ionicons
									name="trash-outline"
									size={22}
									color={colors.text}
								></Ionicons>
							</ConfirmDeleteModal>
						);
					}}
				/>
			)}
		>
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
				{/* loop over plate[] to render a card with plateItems */}
				{/* i need a better key id these won't be unique */}
				{/* TODO: Make this a swipeable and create a removePlateItem(mealId) function to delete individual plates */}
				{/* use something like feedinglog.filter((log) => log.plate.filter((item) => item.id !== id) */}
				{feedingLog.plate.map((meal) => (
					<DashboardPlateItem meal={meal} key={meal.id} />
				))}
			</View>
		</ReanimatedSwipeable>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "flex-start",
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
