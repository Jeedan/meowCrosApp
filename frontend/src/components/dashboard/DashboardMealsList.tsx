import { Meal } from "@shared/types/meal";
import DashboardMealItem from "./DashBoardMealItem";
import EmptyMealsList from "./EmptyMealsList";

type DashboardMealsListProps = {
	meals: Meal[];
	onDelete: (mealId: string) => void;
};

export default function DashboardMealsList({
	meals,
	onDelete,
}: DashboardMealsListProps) {
	if (!meals || meals.length === 0) return <EmptyMealsList />;
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

