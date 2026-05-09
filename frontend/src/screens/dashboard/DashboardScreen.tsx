import { colors, globalStyles } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function DashboardScreen() {
	return (
		<ScrollView
			style={globalStyles.container}
			contentContainerStyle={globalStyles.scrollContent}
			showsVerticalScrollIndicator={false}
		>
			<View style={globalStyles.header}>
				<Text style={globalStyles.title}>Dashboard</Text>
				<Ionicons
					name="share-outline"
					size={24}
					color={colors.primary}
				/>
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
	);
}
