import EmptyState from "@/components/EmptyState";
import FoodLibraryList from "@/components/foodLibrary/FoodLibraryList";
import { sortByLastUsed } from "@/data/dummyData";
import { useFoodLibrary } from "@/store/store";
import { globalStyles } from "@/styles/global";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FoodLibraryScreen() {
	const foodLibrary = useFoodLibrary((s) => sortByLastUsed(s.foodLibrary));
	const removeFood = useFoodLibrary((s) => s.removeFood);

	const onDelete = (id: string) => {
		console.log("Delete Food Item:", id);
		removeFood(id);
	};

	const isEmpty = foodLibrary.length === 0;

	return (
		<>
			<SafeAreaView style={globalStyles.scrollContainer} edges={["top"]}>
				<ScrollView
					contentContainerStyle={globalStyles.scrollContent}
					showsVerticalScrollIndicator={false}
				>
					<Text style={[globalStyles.title, styles.title]}>
						Food Library
					</Text>

					{isEmpty ? (
						<View style={styles.emptyContainer}>
							<EmptyState label="Tap + to Add a Food entry to the Library" />
						</View>
					) : (
						<FoodLibraryList
							foodLibrary={foodLibrary}
							onDelete={onDelete}
						/>
					)}
				</ScrollView>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	title: {
		marginBottom: 20,
	},

	emptyScrollContent: {
		flexGrow: 1,
	},

	emptyContainer: {
		flex: 1,
	},
});
