import { colors, globalStyles } from "@/styles/global";
import { formatDate, isToday } from "@/utils/dateUtils";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { catProfile, feedingLog } from "@/data/dummyData";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardMealsList from "@/components/dashboard/DashboardMealsList";
import type { Meal } from "@shared/types/meal";
import { totalDailyCalories } from "@/utils/calorieCalculator";

export default function DashboardScreen() {
	const today = formatDate(new Date());

	const todaysMeals: Meal[] = feedingLog.filter((log) =>
		isToday(log.loggedAt),
	);

	const totalCalories = totalDailyCalories(
		catProfile.ageMonths,
		catProfile.weight,
		catProfile.isNeutered,
		"lose",
	);
	return (
		<SafeAreaView style={globalStyles.scrollContainer}>
			<ScrollView
				contentContainerStyle={globalStyles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.container}>
					<DashboardHeader today={today} catName={catProfile.name} />
				</View>
				<Text style={styles.calories}>
					{" "}
					{totalCalories} daily calories
				</Text>

				<DashboardMealsList meals={todaysMeals} />
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
		width: "100%",
		height: "100%",
	},

	calories: {
		color: colors.textSecondary,
		fontSize: 18,
	},
});
