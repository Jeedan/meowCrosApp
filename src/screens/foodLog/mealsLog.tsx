import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function MealsLogScreen() {
	return (
		<View style={globalStyles.container}>
			<Text>Empty Meals Log, add a meal entry!</Text>
			<Link href="/dashboard">Go to Dashboard</Link>
			<Link href="/mealslog/addmeal">Add a Meal entry</Link>
			<Link href="/mealslog/history">View Meals History</Link>
		</View>
	);
}
