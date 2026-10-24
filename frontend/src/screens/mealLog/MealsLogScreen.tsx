import Button from "@/components/Button";
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
import { daysAgo, formatDate, getDayKey, isToday } from "@/utils/dateUtils";
import { groupFeedingLogByDay } from "@/utils/groupFeedinglogs";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { Profiler } from "react";
import MealsListRow, {
	type MealsListItem,
} from "@/components/mealLog/MealsListRow";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import type { FeedingLog } from "@shared/types/meal";

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
	const selectedDayKey = getDayKey(currentDate);
	const currentDay = formatDate(currentDate);
	const displayToday = isToday(currentDate);

	const mealsByDay = useMemo(() => {
		return groupFeedingLogByDay(feedingLog);
	}, [feedingLog]);

	const todaysFeeding = mealsByDay[selectedDayKey] ?? [];

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

	// ************* MEASURING TIME *************
	const navigationStart = useRef<number | null>(null);
	useEffect(() => {
		if (navigationStart.current === null) return;

		const elapsed = performance.now() - navigationStart.current;

		console.log(
			`[Day navigation] ${elapsed.toFixed(1)}ms until React effect`,
		);

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				if (navigationStart.current === null) return;

				const elapsed = performance.now() - navigationStart.current;

				console.log(
					`[Day navigation] ${elapsed.toFixed(1)}ms after two frames`,
				);

				navigationStart.current = null;
			});
		});
	}, [selectedDayKey]);
	// ************* MEASURING TIME *************
	const navigateDayHandler = (n: number) => {
		navigationStart.current = performance.now();
		setDayCounter((previousDayCounter) => previousDayCounter + n);
	};

	const listData = useMemo<MealsListItem[]>(() => {
		const items: MealsListItem[] = [
			{ type: "summary", id: "calorie-summary" },
		];

		for (const log of todaysFeeding) {
			items.push({
				type: "feedingHeader",
				id: `header-${log.id}`,
				log,
			});

			for (const meal of log.plate) {
				items.push({
					type: "plate",
					id: `plate-${log.id}-${meal.id}`,
					feedingLogId: log.id,
					meal,
				});
			}
		}

		return items;
	}, [todaysFeeding]);

	// ************* MEASURING TIME *************
	console.log(
		"[MealsList data]",
		"day:",
		selectedDayKey,
		"rows:",
		listData.length,
		"first row:",
		listData[0]?.id,
	);
	// ************* MEASURING TIME *************
	const onListRender = (
		id: string,
		phase: "mount" | "update" | "nested-update",
		actualDuration: number,
	) => {
		console.log(`[Profiler] ${phase}: ${actualDuration.toFixed(1)}ms`);
	};

	const renderItem = useCallback(
		({ item }: { item: MealsListItem }) => (
			<MealsListRow
				item={item}
				caloriesConsumed={caloriesConsumed}
				caloriesRemaining={caloriesRemaining}
				totalDailyCalories={totalDailyCalories}
				onRequestDelete={requestDelete}
			/>
		),
		[
			caloriesConsumed,
			caloriesRemaining,
			totalDailyCalories,
			requestDelete,
		],
	);
	// IF EMPTY
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
			</View>

			{/* Meals */}
			<View style={styles.scrollContainer}>
				<Profiler id="MealsList" onRender={onListRender}>
					<FlatList
						// initialNumToRender={2}
						// maxToRenderPerBatch={3}
						// updateCellsBatchingPeriod={16}
						// windowSize={4}
						data={listData}
						keyExtractor={(item) => item.id}
						contentContainerStyle={styles.scrollContent}
						showsVerticalScrollIndicator={false}
						renderItem={renderItem}
						ListHeaderComponent={
							<>
								<DateNavigation
									currentDay={currentDay}
									displayToday={displayToday}
									onPress={navigateDayHandler}
								/>
							</>
						}
						stickyHeaderIndices={[1]}
					/>
				</Profiler>

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
