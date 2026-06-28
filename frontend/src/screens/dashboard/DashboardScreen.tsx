import { globalStyles } from "@/styles/global";
import { formatDate, isToday } from "@/utils/dateUtils";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { catProfile } from "@/data/dummyData";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
	calcTotalDailyCalories,
	calorieBreakdown,
	caloriesConsumedPerDay,
	caloriesConsumedPercentage,
} from "@/utils/calorieCalculator";
import DashboardProgressBar from "@/components/dashboard/DashboardProgressBar";
import { useFeedingLog } from "@/store/store";
import DashboardFeeding from "@/components/dashboard/DashboardFeeding";
import EmptyState from "@/components/EmptyState";

export default function DashboardScreen() {
	const today = formatDate(new Date());
	const feedingLog = useFeedingLog((state) => state.feedingLog);
	const todaysFeeding = feedingLog.filter((l) => isToday(l.loggedAt));
	const isEmpty = todaysFeeding.length === 0;

	// Todo: move calorie calculations into a different component
	const totalDailyCalories = calcTotalDailyCalories(
		catProfile.ageMonths,
		catProfile.weight,
		catProfile.isNeutered,
		catProfile.goal,
	);
	const calsConsumed = caloriesConsumedPerDay(todaysFeeding);
	const consumedPercentage = caloriesConsumedPercentage(
		calsConsumed,
		totalDailyCalories,
	);
	const caloricBreakdown = calorieBreakdown(
		calsConsumed,
		consumedPercentage,
		totalDailyCalories,
	);

	return (
		<SafeAreaView style={globalStyles.scrollContainer} edges={["top"]}>
			<ScrollView
				contentContainerStyle={globalStyles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.container}>
					<DashboardHeader today={today} catName={catProfile.name} />
				</View>

				<View style={styles.centered}>
					<DashboardProgressBar calorieBreakdown={caloricBreakdown} />
				</View>

				{isEmpty ? (
					<View style={styles.emptyState}>
						<EmptyState label="Empty Meal log. Press + to add a meal" />
					</View>
				) : (
					todaysFeeding.map((log) => (
						<DashboardFeeding key={log.id} feedingLog={log} />
					))
				)}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "flex-start",
	},

	centered: {
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
	},
	emptyState: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
