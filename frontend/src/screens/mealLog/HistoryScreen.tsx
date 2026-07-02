import { globalStyles } from "@/styles/global";
import { Text, View } from "react-native";

export default function HistoryScreen() {
	// TODO:
	// get feedinglog from zustand
	// get 7 dayHistory and pass it feedinglog

	return (
		<View style={globalStyles.container}>
			<Text>7 day Meals History</Text>

			{/* TODO: */}
			{/* spawn a cartesian chart from victory native */}
			{/* render a bar chart and pass the feedinglog as data  */}
		</View>
	);
}
