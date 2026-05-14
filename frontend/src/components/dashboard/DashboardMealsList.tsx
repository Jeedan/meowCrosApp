import { Meal } from "@shared/types/meal";
import DashboardMealItem from "./DashBoardMealItem";
import EmptyMealsList from "./EmptyMealsList";

type DashboardMealsListProps = {
	meals: Meal[];
};

export default function DashboardMealsList({ meals }: DashboardMealsListProps) {
	if (meals.length === 0) return <EmptyMealsList />;
	return (
		<>
			{meals.map((meal) => (
				<DashboardMealItem key={meal.id} meal={meal} />
			))}
		</>
	);
}
