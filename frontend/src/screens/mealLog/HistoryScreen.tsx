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

	function countDaysOnTarget(
		dayHistory: DayHistory[],
		target: number,
	): number {
		const leeWay = 0.15 * target;
		const upperBounds = target + leeWay;
		const lowerBounds = target - leeWay;
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

	return (
		<View style={styles.container}>
			{/* TODO display the date range of the current visible bars
					example: Sept 17-24	
			*/}
			<Text style={styles.title}>Feeding History</Text>
			{/* chart container */}
			<HistoryBarChart data={dayHistory} />

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

	chartContainer: {
		justifyContent: "center",
		alignItems: "center",
	},

	barColor: {
		color: colors.primary,
	},
});
