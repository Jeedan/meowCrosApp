import { colors, globalStyles, typography } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

type DashboardHeaderProps = {
	catName: string;
	today: string;
};

export default function DashboardHeader({
	today,
	catName,
}: DashboardHeaderProps) {
	return (
		<View style={globalStyles.header}>
			<Text style={styles.date}>{today}</Text>
			<Text style={globalStyles.title}>{catName}'s Dashboard</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	date: {
		fontSize: typography.body,
		fontWeight: "600",
		color: colors.textSecondary,
	},
});
