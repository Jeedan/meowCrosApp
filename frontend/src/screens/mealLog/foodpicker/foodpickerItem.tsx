import FoodItemCard from "@/components/foodLibrary/FoodItemCard";
import { colors, radius, spacing } from "@/styles/global";
import { FoodItem } from "@shared/types/meal";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ComponentProps = {
	onPress: (id: string) => void;
	selectedId: string | null;
	foodItem: FoodItem;
};

export default function FoodPickerItem({
	onPress,
	selectedId,
	foodItem,
}: ComponentProps) {
	const foodId = foodItem.id;
	const isSelected = foodId === selectedId;
	return (
		<View
			style={[
				styles.centered,
				isSelected ? styles.selected : styles.notSelected,
			]}
		>
			<Pressable
				onPress={() => {
					onPress(foodId);
				}}
			>
				<FoodItemCard foodItem={foodItem} />
			</Pressable>
		</View>
	);
}
const styles = StyleSheet.create({
	centered: {
		width: "100%",
		justifyContent: "center",
		backgroundColor: colors.cardBackground,
		borderRadius: radius.xl,
		padding: spacing.xs,
		marginBottom: spacing.sm,
	},

	selected: {
		borderColor: colors.primary,
		borderWidth: 1,
	},

	notSelected: {
		borderWidth: spacing.none,
	},
});
