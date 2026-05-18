import { globalStyles } from "@/styles/global";
import { formatDate, isToday } from "@/utils/dateUtils";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { catProfile, feedingLog } from "@/data/dummyData";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardMealsList from "@/components/dashboard/DashboardMealsList";
import type { Meal } from "@shared/types/meal";
import { totalDailyCalories } from "@/utils/calorieCalculator";
import DashboardProgressBar from "@/components/dashboard/DashboardProgressBar";
import { useState } from "react";

export default function DashboardScreen() {
	const today = formatDate(new Date());

	//const todaysMeals: Meal[] = [];
	const [todaysMeals, setTodaysMeals] = useState<Meal[]>(
		feedingLog.filter((log) => isToday(log.loggedAt)),
	);

	const onDeleteMealItem = (mealId: string) => {
		console.log(`Deleted meal: ${mealId}`);
		setTodaysMeals((previous) => {
			return previous.filter((prev) => prev.id !== mealId);
		});
	};

	const totalCalories = totalDailyCalories(
		catProfile.ageMonths,
		catProfile.weight,
		catProfile.isNeutered,
		catProfile.goal,
	);

	const caloriesConsumed = todaysMeals.reduce(
		(acc, meal) => acc + meal.kcalCalculated,
		0,
	);

	const consumedPercentage =
		totalCalories > 0
			? Math.round((caloriesConsumed / totalCalories) * 100)
			: 0;

	const calorieBreakdown = {
		consumed: caloriesConsumed,
		consumedPercentage: consumedPercentage,
		total: totalCalories,
	};

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
					<DashboardProgressBar calorieBreakdown={calorieBreakdown} />
				</View>

				<DashboardMealsList
					meals={todaysMeals}
					onDelete={onDeleteMealItem}
				/>
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
});
