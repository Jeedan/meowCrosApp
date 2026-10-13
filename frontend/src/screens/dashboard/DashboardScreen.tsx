import { colors, globalStyles } from "@/styles/global";
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

export default function DashboardScreen() {
	const today = formatDate(new Date());
	const feedingLog = useFeedingLog((state) => state.feedingLog);
	const todaysFeeding = feedingLog.filter((l) => isToday(l.loggedAt));
	const isEmpty = todaysFeeding.length === 0;
	// todo give default values when empty
	const lastMeal = todaysFeeding[todaysFeeding.length - 1];
	const lastFood = lastMeal?.plate ?? [];
	const lastFedAt = lastMeal
		? lastMeal.loggedAt.toLocaleTimeString("en-GB", {
				hour: "2-digit",
				minute: "2-digit",
			})
		: "No Meals yet";
	// TODO: create a feeding interval constant from settings at some point
	const convertToMilliseconds = 60 * 60 * 1000;
	const earliestNextMealInterval = 2;
	const latestNextMealInterval = 3;
	const lastMealTime = lastMeal ? lastMeal.loggedAt : new Date();

	const earliestNextMeal = lastMeal
		? new Date(
				lastMealTime.getTime() +
					earliestNextMealInterval * convertToMilliseconds,
			)
		: new Date();

	const latestNextMeal = lastMeal
		? new Date(
				lastMealTime.getTime() +
					latestNextMealInterval * convertToMilliseconds,
			)
		: new Date();

	const earliestNextMealFormatted = earliestNextMeal.toLocaleTimeString(
		"en-GB",
		{
			hour: "2-digit",
			minute: "2-digit",
		},
	);
	const latestNextMealFormatted = latestNextMeal.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
	});
	const totalMealsSoFar = todaysFeeding.length;

	// Todo: move calorie calculations into a different component
	const totalDailyCalories = calcTotalDailyCalories(catProfile);
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

	const lastMealCaloriesConsumed = lastFood.reduce(
		(a, meal) => a + meal.kcalCalculated,
		0,
	);
	const lastMealGramsConsumed = lastFood.reduce(
		(a, meal) => a + meal.gramsServed,
		0,
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
				{/* TODO: Add cards in a 2x2 row
				 1. Last meal 
				 2. total meals had so far
				 3. next meal timing
				*/}
				<Text style={styles.cardHeader}>Meals</Text>
				<View style={styles.card}>
					<Text style={styles.cardTitle}>Last Meal</Text>

					{isEmpty ? (
						<Text style={styles.cardText}>
							No meals logged today.
						</Text>
					) : (
						<>
							{lastFood.map((item) => (
								<View style={styles.row} key={item.id}>
									<Text
										style={[
											styles.cardText,
											styles.foodName,
										]}
										numberOfLines={1}
									>
										{item.foodNameSnapshot}
									</Text>
									<Text style={styles.cardText}>-</Text>
									<Text style={styles.cardText}>
										{item.gramsServed}g
									</Text>
								</View>
							))}

							<Text style={styles.cardText}>
								Total: {lastMealGramsConsumed}g -{" "}
								{lastMealCaloriesConsumed}kcal
							</Text>
						</>
					)}
				</View>

				<View style={styles.card}>
					<Text style={styles.cardTitle}>Last Fed At</Text>

					<Text style={styles.cardText}>{lastFedAt}</Text>
				</View>
				<View style={styles.card}>
					<Text style={styles.cardTitle}>Next Meal At</Text>

					<Text style={styles.cardText}>
						{earliestNextMealFormatted} - {latestNextMealFormatted}
					</Text>
				</View>
				<View style={styles.card}>
					<Text style={styles.cardTitle}>Total Meals Eaten</Text>

					<Text style={styles.cardText}>{totalMealsSoFar}</Text>
				</View>
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

	card: {
		backgroundColor: colors.cardBackground,
		width: "100%",
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 6,
		marginBottom: 6,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		minHeight: 56,
		gap: 8,
	},

	cardHeader: {
		fontSize: 26,
		fontWeight: "bold",
		color: colors.text,
		marginBottom: 6,
	},

	cardTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: colors.text,
		marginBottom: 4,
		marginTop: 6,
	},

	cardText: {
		fontSize: 16,
		color: colors.text,
		marginBottom: 2,
	},

	foodName: {
		flex: 1,
	},
});
