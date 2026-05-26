import { Legacy_Meal } from "@shared/types/meal";
import DashboardMealItem from "./DashBoardMealItem";
import EmptyState from "../EmptyState";
import { StyleSheet, Text, View } from "react-native";
import { globalStyles } from "@/styles/global";

type DashboardMealsListProps = {
	meals: Legacy_Meal[];
	onDelete: (mealId: string) => void;
};

export default function DashboardMealsList({
	meals,
	onDelete,
}: DashboardMealsListProps) {
	if (!meals || meals.length === 0)
		return (
			<View style={styles.centered}>
				<EmptyState label="Empty Meal log. Press + to add a meal" />
			</View>
		);
	return (
		<>
			<Text style={globalStyles.sectionTitle}>Today's Meals:</Text>
			{meals.map((meal) => (
				<DashboardMealItem
					key={meal.id}
					meal={meal}
					onDelete={onDelete}
				/>
			))}
		</>
	);
}

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		paddingBottom: 140,
	},
});
