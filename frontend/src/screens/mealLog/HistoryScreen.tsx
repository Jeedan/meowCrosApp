import { catProfile, createDayHistory, DayHistory } from "@/data/dummyData";
import { useFeedingLog } from "@/store/store";
import { colors } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";
import HistoryBarChart from "./history/HistoryChart";
import { calcTotalDailyCalories } from "@/utils/calorieCalculator";

export default function HistoryScreen() {
	// get feedinglog from zustand
	// get 7 dayHistory and pass it feedinglog
	const feedingLog = useFeedingLog((state) => state.feedingLog);
	const dayHistory = createDayHistory(feedingLog, 7);
	const numberOfDays = dayHistory.length;
	const calorieTarget = calcTotalDailyCalories(catProfile);
	const daysOnTarget = countDaysOnTarget(dayHistory, calorieTarget);
	const dateRangeDisplay = formatDateRange(dayHistory);
	const averageCaloriesHistory = calculateAverageCalories(dayHistory);

	function countDaysOnTarget(
		dayHistory: DayHistory[],
		target: number,
	): number {
		const leeWay = 0.1 * target;
		const upperBounds = target + leeWay;
		const lowerBounds = target - leeWay;
		const numberOfDays = dayHistory.length;
		let daysOnTarget = 0;

		for (let i = 0; i < numberOfDays; i++) {
			const currentDay = dayHistory[i];
			if (
				currentDay.consumed > upperBounds ||
				currentDay.consumed < lowerBounds
			) {
				continue;
			}

			daysOnTarget += 1;
			console.log(
				`calorie on target: `,
				new Date(currentDay.date).toLocaleDateString(undefined, {
					dateStyle: "medium",
				}),
			);
		}
		return daysOnTarget;
	}
	// TODO: Probably move into its own file? but what file...
	// display the date range of the current visible bars
	// example: Sept 17-24, 2026  or Sept 28 - Oct 5, 2026
	// instead of dayHistory we can also pass a startDate and endDate numbers;
	function formatDateRange(dayHistory: DayHistory[]): string {
		if (dayHistory.length <= 0) {
			return new Date().toLocaleDateString(undefined, {
				dateStyle: "medium",
			});
		}

		const startDate = new Date(dayHistory[0].date);
		const endDate = new Date(dayHistory[dayHistory.length - 1].date);

		const firstMonth = startDate.toLocaleDateString("en-CA", {
			month: "short",
		});
		const endMonth = endDate.toLocaleDateString("en-CA", {
			month: "short",
		});

		if (firstMonth === endMonth) {
			return `${firstMonth} ${startDate.getDate()} - ${endDate.getDate()}, ${startDate.getFullYear()}`;
		}

		return `${firstMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}, ${startDate.getFullYear()}`;
	}

	// TODO: refactor into another file during polish phase
	function calculateAverageCalories(dayHistory: DayHistory[]): number {
		if (dayHistory.length <= 0) {
			return 0;
		}

		let sum = 0;
		for (const day of dayHistory) {
			sum += day.consumed;
		}

		const average = Math.round(sum / dayHistory.length);

		return average;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{dateRangeDisplay}</Text>
			<Text style={styles.summary}>
				Average calories: {averageCaloriesHistory}
			</Text>
			{/* chart container */}
			<HistoryBarChart data={dayHistory} targetCalories={calorieTarget} />

			<Text style={styles.summary}>
				{daysOnTarget} of {numberOfDays} days on target
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: colors.background,
		paddingTop: 40,
	},

	title: {
		fontSize: 24,
		fontWeight: "600",
		color: colors.text,
		marginBottom: 20,
	},

	summary: {
		marginTop: 12,
		fontSize: 16,
		color: colors.text,
	},
});
