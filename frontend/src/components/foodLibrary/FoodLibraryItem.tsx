import { FoodResponse } from "@shared/schemas/foods.schema";
import SharedSwipeRow from "../gestures/SharedSwipeRow";
import { SharedValue } from "react-native-reanimated";
import FoodItemCard from "./FoodItemCard";

type FoodLibraryItemProps = {
	foodItem: FoodResponse;
	onRequestDelete: (foodId: string) => void;
	openSwipeRowId: SharedValue<string | null>;
};

export default function FoodLibraryItem({
	foodItem,
	onRequestDelete,
	openSwipeRowId,
}: FoodLibraryItemProps) {
	return (
		<SharedSwipeRow
			onDeletePress={() => onRequestDelete(foodItem.id)}
			openSwipeRowId={openSwipeRowId}
			rowId={foodItem.id}
		>
			<FoodItemCard foodItem={foodItem} />
		</SharedSwipeRow>
	);
}
