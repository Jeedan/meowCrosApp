import { colors, globalStyles } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

type EmptyStateProps = {
	label: string;
};

export default function EmptyState({ label }: EmptyStateProps) {
	return (
		<View style={styles.centered}>
			<Text style={globalStyles.sectionTitle}>{label}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
