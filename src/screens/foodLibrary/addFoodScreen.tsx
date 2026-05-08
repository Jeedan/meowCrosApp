import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function AddFoodScreen() {
	return (
		<View style={globalStyles.container}>
			<Text>Add a Food to the Library </Text>
			<Link href="/dashboard">Dashhboard</Link>
			<Link href="/mealslog">Meals log</Link>
		</View>
	);
}
