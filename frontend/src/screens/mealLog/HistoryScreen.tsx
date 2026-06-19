import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function HistoryScreen() {
	return (
		<View style={globalStyles.container}>
			<Text>7 day Meals History</Text>
			<Link href="/mealslog">Meals log</Link>

			{/* TODO: grab 7 days daysHistory from dummy data */}
			{/* spawn a cartesian chart from victory native */}
			{/* render a bar chart and pass the feedinglog as data  */}
		</View>
	);
}
