import Button from "@/components/Button";
import DashboardFeeding from "@/components/dashboard/DashboardFeeding";
import EmptyState from "@/components/EmptyState";
import DateNavigation from "@/components/mealLog/DateNavigation";
import { catProfile } from "@/data/dummyData";
import { useFeedingLog } from "@/store/store";
import {
	colors,
	globalStyles,
	radius,
	spacing,
	typography,
} from "@/styles/global";
import {
	calcTotalDailyCalories,
	calorieBreakdown,
	caloriesConsumedPerDay,
	caloriesConsumedPercentage,
} from "@/utils/calorieCalculator";
import { daysAgo, formatDate, isToday } from "@/utils/dateUtils";
import { router } from "expo-router";
import { useState } from "react";
import {
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

// TODO: Date Navigation actually needs to change date and food listed
// Calorie preview should sticky at the top but have boxes become stretched and shorter in height to take less space.

// TODO: I want to render 10-12 buttons for each hour of the day
// clicking the button will add a meal TO that hour container
// create a helper function just grabbing current minutes and appending it to the hour button value (ex: button 1pm -> 1: 15, 1:30, 1:45, all meals of that hour fall into it )
// HourlyPlate, might need a better name
// create an object with with id of the hour (0-23) and a plate array
// after for each hour index, loop over today's feeding log, check for the getHour() value and if it contains a meal add it to the plate array of said index.
// else continue to the next hour index
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
							onPress={() => {
								console.log("navigating to /historyScreen");
								router.navigate(
									"/(app)/(tabs)/mealslog/history",
								);
							}}
						>
							<Text style={[styles.title, styles.history]}>
								History
							</Text>
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

			{/* Meals */}
			<View style={styles.scrollContainer}>
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					scrollEventThrottle={16}
					stickyHeaderIndices={[0]}
				>
					{/* 3 cards in a row */}
					{/* Calories consumed | Remaining | Daily Goal */}
					{/* copy the calculations like in DashboardScreen, move them into their own component */}
					{/* Index 0: Sticky calorie summary */}
					{/* Sticky wrapper: no animated style */}
					<View>
						{/* Your existing three calorie cards */}
						<View style={[styles.rowContainer]}>
							<View style={[styles.calorieContainer]}>
								<View style={styles.calorieCardContent}>
									<Text
										numberOfLines={1}
										style={[styles.calorieValue]}
									>
										{calsConsumed}
									</Text>
									<Text
										numberOfLines={1}
										style={styles.calorieText}
									>
										consumed
									</Text>
								</View>
							</View>
							<View style={[styles.calorieContainer]}>
								<View style={styles.calorieCardContent}>
									<Text
										numberOfLines={1}
										style={[styles.calorieValue]}
									>
										{caloriesRemaining}
									</Text>
									<Text
										numberOfLines={1}
										style={styles.calorieText}
									>
										remaining
									</Text>
								</View>
							</View>
							<Animated.View style={[styles.calorieContainer]}>
								<View style={styles.calorieCardContent}>
									<Animated.Text
										numberOfLines={1}
										style={[styles.calorieValue]}
									>
										{totalDailyCalories}
									</Animated.Text>
									<Text
										numberOfLines={1}
										style={styles.calorieText}
									>
										goal
									</Text>
								</View>
							</Animated.View>
						</View>
					</View>
					{/* Meals */}
					<View style={styles.container}>
						{todaysFeeding.map((log) => (
							<DashboardFeeding key={log.id} feedingLog={log} />
						))}
					</View>
				</ScrollView>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: colors.cardBackground,
		justifyContent: "flex-start",
		alignItems: "center",
		paddingTop: spacing.xl,
	},

	headerRow: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: spacing.xl,
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.md,
	},

	headerItem: {
		justifyContent: "center",
		alignItems: "center",
	},

	historyBtn: {
		backgroundColor: colors.background,
		marginTop: spacing.none,
		borderColor: colors.text,
		borderWidth: 0.5,
		borderRadius: radius.lg,
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.sm,
	},

	title: {
		fontSize: typography.titleLarge,
		fontWeight: "600",
		color: colors.text,
	},

	history: {
		fontSize: typography.bodyLarge,
		fontWeight: "400",
	},

	container: {
		justifyContent: "flex-start",
		alignItems: "center",
		paddingHorizontal: spacing.xl,
		paddingTop: spacing.sm,
	},

	scrollContainer: {
		flex: 1,
		backgroundColor: colors.background,
	},

	scrollContent: {
		flexGrow: 1,
		paddingBottom: spacing.xl,
	},

	dateNavigationContainer: {
		justifyContent: "center",
		alignItems: "center",
	},

	pickButton: {
		borderRadius: radius.xl,
	},

	textColor: {
		color: colors.text,
	},

	rowContainer: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: spacing.sm,
		backgroundColor: colors.cardBackground,
		padding: spacing.sm,
	},

	calorieContainer: {
		flex: 1,
		minWidth: 0,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: radius.md,
		overflow: "hidden",
		backgroundColor: colors.primary,
	},

	calorieCardContent: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: spacing.xs,
		width: "100%",
		padding: spacing.sm,
	},

	calorieValue: {
		color: colors.text,
		fontSize: typography.bodyLarge,
		fontWeight: "600",
	},

	calorieText: {
		color: colors.text,
		fontWeight: "400",
		fontSize: typography.caption,
	},
});
