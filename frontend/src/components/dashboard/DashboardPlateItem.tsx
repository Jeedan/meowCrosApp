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
	container: {
		justifyContent: "center",
		alignItems: "flex-start",
	},

	mealsContainer: {
		borderColor: colors.textSecondary,
		backgroundColor: colors.cardBackground,
		borderRadius: 15,
		borderWidth: 0,
		paddingVertical: 6,
		paddingHorizontal: 12,
	},

	shadow: {
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.55,
		shadowRadius: 15,
		elevation: 3,
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

	calorieText: {
		color: colors.text,
	},

	// incase we want to expand the swipe menu
	deleteContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 12,
		gap: 8,
	},

	deleteButton: {
		backgroundColor: colors.alert,
		marginTop: 0,
		paddingVertical: 12,
		paddingHorizontal: 12,
		borderRadius: 14,
	},
});
