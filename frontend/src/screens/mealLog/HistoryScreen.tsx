import { createDayHistory } from "@/data/dummyData";
import { useFeedingLog } from "@/store/store";
import { globalStyles } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

export default function HistoryScreen() {
	// TODO:
	// get feedinglog from zustand
	// get 7 dayHistory and pass it feedinglog
	const feedingLog = useFeedingLog((state) => state.feedingLog);
	const dayHistory = createDayHistory(feedingLog);

	return (
		<View style={styles.container}>
			<Text>7 day Meals History</Text>
			{/* TODO: */}
			{/* spawn a cartesian chart from victory native */}
			{/* render a bar chart and pass the feedinglog as data  */}
			{/* chart container */}
			<View></View>
			{/* chart here */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
