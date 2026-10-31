import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import DateNavigation from "@/components/mealLog/DateNavigation";
import { catProfile } from "@/data/dummy";
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
import {
	daysAgo,
	formatDate,
	getDayKey,
	getHourKey,
	getRelativeDay,
} from "@/utils/dateUtils";
import {
	groupFeedingByHour,
	groupFeedingLogByDay,
} from "@/utils/groupFeedinglogs";
import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import MealsListRow, {
	type MealsListItem,
} from "@/components/mealLog/MealsListRow";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import { useSharedValue } from "react-native-reanimated";

// TODO: I want to render 10-12 buttons for each hour of the day
// clicking the button will add a meal TO that hour container
// create a helper function just grabbing current minutes and appending it to the hour button value (ex: button 1pm -> 1: 15, 1:30, 1:45, all meals of that hour fall into it )
// HourlyPlate, might need a better name
// create an object with with id of the hour (0-23) and a plate array
// after for each hour index, loop over today's feeding log, check for the getHour() value and if it contains a meal add it to the plate array of said index.
// else continue to the next hour index
export default function MealsLogScreen() {
	const onPressHandler = () => {
		// TODO pass timestamp to add meal
		console.log("navigating to addMeal screen");
		router.push("/addmeal");
	};

	const feedingLog = useFeedingLog((state) => state.feedingLog);
	const removePlateItem = useFeedingLog((state) => state.removePlateItem);
	// modal code
	const [pendingDelete, setPendingDelete] = useState<{
		feedingLogId: string;
		mealId: string;
	} | null>(null);

	const requestDelete = useCallback(
		(feedingLogId: string, mealId: string) => {
			setPendingDelete({ feedingLogId, mealId });
		},
		[],
	);

	const dismissDelete = useCallback(() => {
		setPendingDelete(null);
	}, []);

	const confirmDelete = useCallback(() => {
		if (!pendingDelete) return;

		removePlateItem(pendingDelete.feedingLogId, pendingDelete.mealId);
		setPendingDelete(null);
	}, [pendingDelete, removePlateItem]);

	const isEmpty = !feedingLog || feedingLog.length === 0;

	const [dayCounter, setDayCounter] = useState(0);
	const currentDate = daysAgo(dayCounter);
	const displayCurrentDay = formatDate(currentDate);
	const selectedDayKey = getDayKey(currentDate);

	//	const displayToday = isToday(currentDate);
	const displayRelativeDay =
		dayCounter === 0 || dayCounter === 1 || dayCounter === -1;

	const navigateDayHandler = (n: number) => {
		//navigationStart.current = performance.now();
		setDayCounter((previousDayCounter) => previousDayCounter + n);
	};

	// group meals by day
	const mealsByDay = useMemo(() => {
		return groupFeedingLogByDay(feedingLog);
	}, [feedingLog]);

	// select only the meals for this day
	const todaysFeeding = mealsByDay[selectedDayKey] ?? [];

	// console.log("todaysFeeding: ", JSON.stringify(todaysFeeding, null, 3));
	// TODO: HOURLY BUTTONS
	// create buttons corresponding to each hour of the day (00->23)
	// each hour will have respecting plateItems from todaysFeeding
	// that match the hour. (logged 14:27 -> belongs to 14:00)
	// empty hours just display their button, nothing special
	const groupByHour = useMemo(() => {
		return groupFeedingByHour(todaysFeeding);
	}, [todaysFeeding]);

	//console.log("groupByHour: ", JSON.stringify(groupByHour, null, 3));

	const hours = [];
	for (let i = 0; i < 24; i++) {
		const h = String(i).padStart(2, "0");
		const m = ":00";
		const timeStamp = h + m;
		hours.push(timeStamp);
	}
	const hourlyBuckets = hours.map((item) => ({
		label: item,
		log: groupByHour[item] ?? [],
	}));
	//console.log("hourTest", JSON.stringify(hourlyBuckets, null, 2));

	// TODO: use backend data instead of dummy data
	// move this to a custom hook?
	const totalDailyCalories = calcTotalDailyCalories(catProfile);
	const caloriesConsumed = caloriesConsumedPerDay(todaysFeeding);
	const consumedPercentage = caloriesConsumedPercentage(
		caloriesConsumed,
		totalDailyCalories,
	);
	const caloricBreakdown = calorieBreakdown(
		caloriesConsumed,
		consumedPercentage,
		totalDailyCalories,
	);
	const caloriesRemaining =
		caloricBreakdown.total - caloricBreakdown.consumed;

	// shared value for keeping track of what was swiped
	const openSwipeRowId = useSharedValue<string | null>(null);

	// convert meals into a list to work with Flatlist
	const listData = useMemo<MealsListItem[]>(() => {
		const items: MealsListItem[] = [
			{
				type: "summary",
				id: "calorie-summary",
				caloriesConsumed,
				caloriesRemaining,
				totalDailyCalories,
			},
		];

		// loop over hoursbucket then loop over hours.log
		// store the log for readability.
		for (const hour of hourlyBuckets) {
			const feeding = hour.log;
			// every hour gets a button
			items.push({
				type: "hourButton",
				id: `hourButton-${hour.label}`,
				hour: hour.label,
			});
			// add feedings
			for (const log of feeding) {
				items.push({
					type: "feedingHeader",
					id: `header-${log.id}`,
					log,
				});
				// add plates if they have any
				for (const meal of log.plate) {
					items.push({
						type: "plate",
						id: `plate-${log.id}-${meal.id}`,
						feedingLogId: log.id,
						meal,
					});
				}
			}
		}

		return items;
	}, [
		hourlyBuckets,
		caloriesConsumed,
		caloriesRemaining,
		totalDailyCalories,
	]);

	const renderItem = useCallback(
		({ item }: { item: MealsListItem }) => (
			<MealsListRow
				item={item}
				onRequestDelete={requestDelete}
				openSwipeRowId={openSwipeRowId}
			/>
		),
		[requestDelete, openSwipeRowId],
	);

	return (
		<>
			{/* Header 
					MEALS LOG                 HISTORY
			*/}
			<View style={styles.headerContainer}>
				<View style={styles.headerRow}>
					<View style={styles.headerItem}>
						{displayRelativeDay ? (
							<Text style={styles.title}>
								{getRelativeDay(dayCounter)}
							</Text>
						) : (
							<Text style={styles.title}>
								{displayCurrentDay}
							</Text>
						)}
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
			</View>

			{/* Meals */}
			<View style={styles.scrollContainer}>
				<FlatList
					initialNumToRender={4}
					maxToRenderPerBatch={4}
					windowSize={3}
					updateCellsBatchingPeriod={16}
					data={listData}
					// keyExtractor={(item, index) => `${item.type}-${index}`}
					keyExtractor={(item, index) => item.id}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					renderItem={renderItem}
					ListHeaderComponent={
						<>
							<DateNavigation
								currentDay={displayCurrentDay}
								displayRelativeDay={displayRelativeDay}
								dayCounter={dayCounter}
								onPress={navigateDayHandler}
							/>
						</>
					}
					stickyHeaderIndices={[1]}
				/>

				<ConfirmDeleteModal
					visible={pendingDelete !== null}
					onConfirm={confirmDelete}
					onDismiss={dismissDelete}
					modalText="Do you want to delete the entry?"
				/>
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
	},

	scrollContainer: {
		flex: 1,
		backgroundColor: colors.background,
	},

	scrollContent: {
		flexGrow: 1,
		paddingBottom: spacing.xl,
	},

	pickButton: {
		borderRadius: radius.xl,
	},

	textColor: {
		color: colors.text,
	},
});
