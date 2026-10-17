import { colors, icons, radius, spacing, typography } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { FeedingLog } from "@shared/types/meal";
import { StyleSheet, Text, View } from "react-native";
import { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";
import DashboardPlateItem from "./DashboardPlateItem";
import { useFeedingLog } from "@/store/store";

type DashboardFeedingProps = {
	feedingLog: FeedingLog;
};

export default function DashboardFeeding({
	feedingLog,
}: DashboardFeedingProps) {
	const removeMeal = useFeedingLog((state) => state.removeFeeding);

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
						size={icons.sm}
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
		marginBottom: spacing.sm,
	},

	mealsHeader: {
		fontSize: typography.body,
		fontWeight: "400",
		color: colors.text,
	},

	mealsContainer: {
		borderColor: colors.textSecondary,
		backgroundColor: colors.cardBackground,
		borderRadius: radius.xl,
		borderWidth: spacing.none,
		padding: spacing.md,
		marginBottom: spacing.sm,
	},

	calorieContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.xs,
	},

	calorieText: {
		color: colors.text,
	},

	deleteButton: {
		backgroundColor: colors.alert,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.md,
		borderRadius: radius.xl,
	},

	divider: {
		borderWidth: 0.2,
		borderColor: colors.textSecondary,
	},
});
