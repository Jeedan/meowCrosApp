import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { View } from "react-native";

export default function SettingsScreen() {
	return (
		<View style={globalStyles.container}>
			<Link href="/dashboard">Dashboard</Link>
			<Link href="/mealslog">Meals log</Link>
			<Link href="/foodlibrary">Food Library</Link>
		</View>
	);
}
