import Button from "@/components/Button";
import DashboardFeeding from "@/components/dashboard/DashboardFeeding";
import EmptyState from "@/components/EmptyState";
import DateNavigation from "@/components/mealLog/DateNavigation";
import { catProfile } from "@/data/dummyData";
import { useFeedingLog } from "@/store/store";
import { colors, globalStyles } from "@/styles/global";
import {
	calcTotalDailyCalories,
	calorieBreakdown,
	caloriesConsumed,
	caloriesConsumedPercentage,
} from "@/utils/calorieCalculator";
import { daysAgo, formatDate, isToday } from "@/utils/dateUtils";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MealsLogScreen() {
	const onPressHandler = () => {
		console.log("navigating to addMeal screen");
		router.push("/addmeal");
	};

	const feedingLog = useFeedingLog((state) => state.feedingLog);

	const isEmpty = !feedingLog || feedingLog.length === 0;
	const [dayCounter, setDayCounter] = useState(0);
	const currentDay = formatDate(daysAgo(dayCounter));
	const displayToday = isToday(daysAgo(dayCounter));
	const todaysFeeding = feedingLog.filter((l) => isToday(l.loggedAt));

	const navigateDayHandler = (n: number) => {
		setDayCounter(dayCounter + n);
	};

	const totalDailyCalories = calcTotalDailyCalories(
		catProfile.ageMonths,
		catProfile.weight,
		catProfile.isNeutered,
		catProfile.goal,
	);
	const calsConsumed = caloriesConsumed(todaysFeeding);
	const consumedPercentage = caloriesConsumedPercentage(
		calsConsumed,
		totalDailyCalories,
	);
	const caloricBreakdown = calorieBreakdown(
		calsConsumed,
		consumedPercentage,
		totalDailyCalories,
	);
	const caloriesRemaining =
		caloricBreakdown.total - caloricBreakdown.consumed;

	if (isEmpty) {
		return (
			<View style={globalStyles.container}>
				<EmptyState
					label="
				Empty Meals Log, add a meal entry!"
				/>
				<View>
					<Button onPress={onPressHandler} style={styles.pickButton}>
						<Text style={styles.textColor}>Add Meal</Text>
					</Button>
				</View>
			</View>
		);
	}
	// TODO: loop over feeding log and display each feeding in a card.
	// TODO: Header should display "Today | Last 7 Days | All Time" as tabs
	return (
		<>
			{/* Header 
					MEALS LOG                 HISTORY
			*/}
			<View style={styles.headerContainer}>
				<View style={styles.headerRow}>
					<View style={styles.headerItem}>
						<Text style={styles.title}>Meals log</Text>
					</View>

					<View style={styles.headerItem}>
						<Button
							style={styles.historyBtn}
							onPress={() =>
								console.log("navigating to /historyScreen")
							}
						>
							<Text style={styles.title}>History</Text>
						</Button>
					</View>
				</View>

				{/* Display Feeding Time */}
				{/* a card of each meal */}
				{/* < TODAY >  */}
				<View style={styles.dateNavigationContainer}>
					<DateNavigation
						currentDay={currentDay}
						displayToday={displayToday}
						onPress={navigateDayHandler}
					/>
				</View>
			</View>
			{/* 3 cards in a row */}
			{/* Calories consumed | Remaining | Daily Goal */}
			{/* copy the calculations like in DashboardScreen, move them into their own component */}
			<View style={styles.rowContainer}>
				<View style={styles.calorieContainer}>
					<Text style={styles.calorieValue}>{calsConsumed}</Text>
					<Text style={styles.calorieText}>consumed</Text>
				</View>
				<View style={styles.calorieContainer}>
					<Text style={styles.calorieValue}>{caloriesRemaining}</Text>
					<Text style={styles.calorieText}>Remaining</Text>
				</View>
				<View style={styles.calorieContainer}>
					<Text style={styles.calorieValue}>
						{totalDailyCalories}
					</Text>
					<Text style={styles.calorieText}>Daily Goal</Text>
				</View>
			</View>

			{/* Meals */}
			<SafeAreaView style={globalStyles.scrollContainer} edges={["top"]}>
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.container}>
						{todaysFeeding.map((log) => (
							<DashboardFeeding key={log.id} feedingLog={log} />
						))}
					</View>
				</ScrollView>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: colors.cardBackground,
		justifyContent: "flex-start",
		alignItems: "center",
		paddingTop: 30,
	},

	headerRow: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 20,
		paddingHorizontal: 30,
		paddingVertical: 20,
	},

	headerItem: {
		justifyContent: "center",
	},

	historyBtn: {
		backgroundColor: colors.background,
		marginTop: 0,
		borderColor: colors.text,
		borderWidth: 0.5,
		borderRadius: 12,
		paddingVertical: 6,
		paddingHorizontal: 8,
	},

	title: {
		fontSize: 24,
		fontWeight: "600",
		color: colors.text,
	},

	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
	},

	scrollContent: {
		flexGrow: 1,
		paddingHorizontal: 20,
		paddingBottom: 40,
	},

	dateNavigationContainer: {
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 10,
		paddingBottom: 10,
	},

	pickButton: {
		borderRadius: 14,
	},

	textColor: {
		color: colors.text,
	},

	rowContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingTop: 15,
		gap: 6,
		backgroundColor: colors.background,
	},

	calorieContainer: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.primary,
		borderRadius: 5,
		padding: 6,
	},

	calorieValue: {
		color: colors.text,
		fontSize: 18,
		fontWeight: "600",
	},

	calorieText: {
		color: colors.text,
		fontWeight: "400",
		fontSize: 14,
	},
});
