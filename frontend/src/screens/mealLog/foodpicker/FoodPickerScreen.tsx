import Button from "@/components/Button";
import { useFoodLibrary, useSelectedFood } from "@/store/store";
import { colors, globalStyles } from "@/styles/global";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FoodPickerItem from "./foodpickerItem";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import { SelectedFoodItem } from "@/types/SelectedFood";
import { router } from "expo-router";

export default function FoodPickerScreen() {
	const foodLibrary = useFoodLibrary((state) => state.foodLibrary);
	const addSelectedFood = useSelectedFood((state) => state.addSelectedFood);
	const [selectedId, setSelectedId] = useState<string | null>(null);

	const onPressHandler = (foodId: string) => {
		setSelectedId(foodId);
	};

	const onConfirmHandler = (foodId: string | null) => {
		if (!foodId) return;

		const food = foodLibrary.find((f) => f.id === foodId);
		if (!food) return;
		const selectedFoodItem: SelectedFoodItem = {
			id: food.id,
			name: food.name,
			brand: food.brand,
			ashPCT: food.ashPCT,
			foodType: food.foodType,
			proteinPCT: food.proteinPCT,
			fatPCT: food.fatPCT,
			fiberPCT: food.fiberPCT,
			moisturePCT: food.moisturePCT,
			servingSizeG: food.servingSizeG,
		};

		addSelectedFood(selectedFoodItem);

		router.back();
	};

	const isEmpty = !foodLibrary || foodLibrary.length === 0;
	if (isEmpty) {
		return (
			<View style={styles.emptyContainer}>
				<EmptyState label="Empty Food Library. Go ahead and add a food" />
				<View>
					<Button onPress={() => router.navigate("/addfood")}>
						<Text style={styles.confirmText}>Add to Library</Text>
					</Button>
				</View>
			</View>
		);
	}

	return (
		<SafeAreaView style={globalStyles.scrollContainer} edges={["top"]}>
			<ScrollView
				contentContainerStyle={globalStyles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.container}>
					{foodLibrary.map((foodItem) => (
						<FoodPickerItem
							onPress={onPressHandler}
							selectedId={selectedId}
							foodItem={foodItem}
							key={foodItem.id}
						/>
					))}
				</View>
			</ScrollView>

			{selectedId ? (
				<View style={styles.confirmButton}>
					<Button onPress={() => onConfirmHandler(selectedId)}>
						<Text style={styles.confirmText}>Add To Plate</Text>
					</Button>
				</View>
			) : null}
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.background,
		padding: 20,
	},
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: colors.background,
	},

	confirmText: {
		fontSize: 16,
		color: colors.text,
	},

	confirmButton: {
		marginTop: 0,
		position: "absolute",
		bottom: 60,
		right: 10,
	},
});
