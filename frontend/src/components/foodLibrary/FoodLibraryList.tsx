import { FoodItem } from "@shared/types/meal";
import FoodLibraryItem from "./FoodLibraryItem";

type FoodLibraryListProps = {
	foodLibrary: FoodItem[];
	onRequestDelete: (foodId: string) => void;
};

export default function FoodLibraryList({
	foodLibrary,
	onRequestDelete,
}: FoodLibraryListProps) {
	return (
		<>
			{foodLibrary.map((foodItem) => (
				<FoodLibraryItem
					key={foodItem.id}
					foodItem={foodItem}
					onRequestDelete={onRequestDelete}
				/>
			))}
		</>
	);
}
