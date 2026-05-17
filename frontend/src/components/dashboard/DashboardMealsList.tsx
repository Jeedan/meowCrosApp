import { Meal } from "@shared/types/meal";
import DashboardMealItem from "./DashBoardMealItem";
import EmptyState from "./EmptyState";

type DashboardMealsListProps = {
	meals: Meal[];
	onDelete: (mealId: string) => void;
};

export default function DashboardMealsList({
	meals,
	onDelete,
}: DashboardMealsListProps) {
	if (!meals || meals.length === 0)
		return <EmptyState label="Empty Meal log. Press + to add a meal" />;
	return (
		<>
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
