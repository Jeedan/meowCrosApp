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
			<Text style={styles.mealText}>
				{meal.gramsServed}g • {meal.kcalCalculated}kcal
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	mealsContainer: {
		borderColor: colors.textSecondary,
		backgroundColor: colors.cardBackground,
		borderRadius: 14,
		borderWidth: 0,
		paddingVertical: 6,
		paddingHorizontal: 12,
		marginBottom: 8,
	},

	mealsHeader: {
		fontSize: 16,
		fontWeight: "600",
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
