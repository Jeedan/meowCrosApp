import { colors } from "@/styles/global";
import { PlateItem } from "@shared/types/meal";
import { StyleSheet, Text, View } from "react-native";

type DashboardPlateItemProps = {
	meal: PlateItem;
};

export default function DashboardPlateItem({ meal }: DashboardPlateItemProps) {
	return (
		<View style={styles.mealsContainer}>
			<Text style={styles.mealsHeader}>{meal.foodNameSnapshot}</Text>
			<Text style={styles.mealText}>Served: {meal.gramsServed}g</Text>
			<Text style={styles.mealText}>calories: {meal.kcalCalculated}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	mealsContainer: {
		borderColor: colors.textSecondary,
		backgroundColor: colors.cardBackground,
		borderRadius: 15,
		borderWidth: 0,
		paddingVertical: 6,
		paddingHorizontal: 12,
	},

	mealsHeader: {
		fontSize: 16,
		fontWeight: "300",
		color: colors.text,
		marginBottom: 4,
	},

	mealText: {
		fontSize: 14,
		fontWeight: "600",
		color: colors.textSecondary,
		marginBottom: 4,
	},
});
