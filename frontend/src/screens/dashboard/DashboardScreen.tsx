import { colors, globalStyles } from "@/styles/global";
import { formatDate } from "@/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
	const today = formatDate(new Date());

	return (
		<SafeAreaView style={globalStyles.container}>
			<ScrollView
				contentContainerStyle={globalStyles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={globalStyles.header}>
					<Text style={styles.date}>{today}</Text>
					<Text style={globalStyles.title}>Dashboard</Text>
				</View>
				<Link href="/mealslog" style={globalStyles.sectionTitle}>
					Meals log
				</Link>
				<Link href="/foodlibrary" style={globalStyles.sectionTitle}>
					Food Library
				</Link>
				<Link href="/settings" style={globalStyles.sectionTitle}>
					Settings
				</Link>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	date: {
		fontSize: 16,
		fontWeight: "600",
		color: colors.textSecondary,
	},
});
