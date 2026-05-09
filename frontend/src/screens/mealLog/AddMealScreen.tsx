import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function AddMealScreen() {
	return (
		<View style={globalStyles.container}>
			<Text>Add a Meals entry </Text>
			<Link href="/mealslog">Meals log</Link>
		</View>
	);
}
