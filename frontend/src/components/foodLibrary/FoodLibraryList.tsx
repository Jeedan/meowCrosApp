import { FoodResponse } from "@shared/schemas/foods.schema";
import FoodLibraryItem from "./FoodLibraryItem";
import { SharedValue } from "react-native-reanimated";

type FoodLibraryListProps = {
	foodLibrary: FoodResponse[];
	onRequestDelete: (foodId: string) => void;
	openSwipeRowId: SharedValue<string | null>;
};

export default function FoodLibraryList({
	foodLibrary,
	onRequestDelete,
	openSwipeRowId,
}: FoodLibraryListProps) {
	return (
		<>
			{foodLibrary.map((foodItem) => (
				<FoodLibraryItem
					key={foodItem.id}
					foodItem={foodItem}
					onRequestDelete={onRequestDelete}
					openSwipeRowId={openSwipeRowId}
				/>
			))}
		</>
	);
}
