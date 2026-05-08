import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function DashboardScreen() {
	return (
		<View style={globalStyles.container}>
			<Text style={styles.title}>Welcome to MeowCros!</Text>
			<Link href="/mealslog">Meals log</Link>
			<Link href="/foodlibrary">Food Library</Link>
			<Link href="/settings">Settings</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "600",
	},
});
