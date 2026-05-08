import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function HistoryScreen() {
	return (
		<View style={globalStyles.container}>
			<Text>7 day Meals History</Text>
			<Link href="/mealslog">Meals log</Link>
			<Link href="/dashboard">Dashboard</Link>
		</View>
	);
}
