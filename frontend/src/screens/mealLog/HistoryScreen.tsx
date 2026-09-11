import { createDayHistory } from "@/data/dummyData";
import { useFeedingLog } from "@/store/store";
import { colors } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";
import HistoryBarChart from "./history/HistoryChart";

export default function HistoryScreen() {
	// get feedinglog from zustand
	// get 7 dayHistory and pass it feedinglog
	const feedingLog = useFeedingLog((state) => state.feedingLog);
	const dayHistory = createDayHistory(feedingLog);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Feeding History</Text>
			{/* TODO: */}
			{/* spawn a cartesian chart from victory native */}
			{/* render a bar chart and pass the feedinglog as data  */}
			{/* chart container */}
			<HistoryBarChart data={dayHistory} />

			{/* TODO: calculate this instead of hardcoding */}
			<Text style={styles.summary}>5 of 7 days on target</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	title: {
		fontSize: 24,
		fontWeight: "600",
	},

	summary: {
		marginTop: 12,
		fontSize: 16,
	},

	chartContainer: {
		justifyContent: "center",
		alignItems: "center",
	},

	barColor: {
		color: colors.primary,
	},
});
