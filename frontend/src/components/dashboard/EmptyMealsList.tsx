import { globalStyles } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

export default function EmptyMealsList() {
	return (
		<View style={styles.centered}>
			<Text style={globalStyles.sectionTitle}>
				Empty Meal log. Press + to add a meal
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "flex-start",
	},

	centered: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
});
