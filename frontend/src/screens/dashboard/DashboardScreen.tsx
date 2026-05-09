import { colors, globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function DashboardScreen() {
	return (
		<View style={globalStyles.container}>
			<Text style={globalStyles.title}>Welcome to MeowCros!</Text>
			<Link href="/mealslog" style={globalStyles.sectionTitle}>
				Meals log
			</Link>
			<Link href="/foodlibrary" style={globalStyles.sectionTitle}>
				Food Library
			</Link>
			<Link href="/settings" style={globalStyles.sectionTitle}>
				Settings
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "600",
		color: colors.text,
	},
});
