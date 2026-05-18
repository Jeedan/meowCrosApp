import { ScrollView } from "react-native";
import { globalStyles } from "@/styles/global";
import { FoodItem } from "@shared/types/meal";
import FoodLibraryItem from "./FoodLibraryItem";

type FoodLibraryListProps = {
	foodLibrary: FoodItem[];
	onDelete: (id: string) => void;
};

export default function FoodLibraryList({
	foodLibrary,
	onDelete,
}: FoodLibraryListProps) {
	return (
		<>
			{foodLibrary.map((foodItem) => (
				<FoodLibraryItem
					key={foodItem.id}
					foodItem={foodItem}
					onDelete={onDelete}
				/>
			))}
		</>
	);
}
