import { FoodItem } from "@shared/types/meal";
import SharedSwipeRow from "../gestures/SharedSwipeRow";
import { SharedValue } from "react-native-reanimated";
import FoodItemCard from "./FoodItemCard";

type FoodLibraryItemProps = {
	foodItem: FoodItem;
	onRequestDelete: (foodId: string) => void;
	openSwipeRowId: SharedValue<string | null>;
};

export default function FoodLibraryItem({
	foodItem,
	onRequestDelete,
	openSwipeRowId,
}: FoodLibraryItemProps) {
	// const handlerDelete = (swipeable: SwipeableMethods) => {
	// 	swipeable.close();
	// 	onDelete(foodItem.id);
	// };

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
