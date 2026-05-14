import { colors } from "@/styles/global";
import { Meal } from "@shared/types/meal";
import { StyleSheet, Text, View } from "react-native";

type DashboardMealItemProps = {
	meal: Meal;
};

export default function DashboardMealItem({ meal }: DashboardMealItemProps) {
	return (
		<View style={styles.mealsContainer}>
			<Text style={styles.mealsHeader}>{meal.foodNameSnapshot}</Text>
			<Text style={styles.mealText}>
				Serving size: {meal.gramsServed}g
			</Text>
			<Text style={styles.mealText}>
				Total calories: {meal.kcalCalculated}
			</Text>
			<Text style={styles.mealText}>
				Fed at: {meal.loggedAt.toLocaleTimeString()}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "flex-start",
	},

	mealsContainer: {
		borderColor: colors.textSecondary,
		borderRadius: 5,
		borderWidth: 1,
		padding: 6,
		marginBottom: 8,
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
