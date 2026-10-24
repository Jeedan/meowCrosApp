import EmptyState from "@/components/EmptyState";
import FoodLibraryList from "@/components/foodLibrary/FoodLibraryList";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import { sortByLastUsed } from "@/data/dummyData";
import { useFoodLibrary } from "@/store/store";
import { globalStyles, spacing } from "@/styles/global";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FoodLibraryScreen() {
	const foodLibrary = useFoodLibrary((s) => sortByLastUsed(s.foodLibrary));
	const removeFood = useFoodLibrary((s) => s.removeFood);

	const isEmpty = foodLibrary.length === 0;

	// modal code
	const [pendingDelete, setPendingDelete] = useState<{
		foodId: string;
	} | null>(null);

	const requestDelete = useCallback((foodId: string) => {
		console.log("requestDelete Food Item:", foodId);
		setPendingDelete({ foodId });
	}, []);

	const dismissDelete = useCallback(() => {
		setPendingDelete(null);
	}, []);

	const confirmDelete = useCallback(() => {
		if (!pendingDelete) return;

		removeFood(pendingDelete.foodId);
		//removePlateItem(pendingDelete.feedingLogId, pendingDelete.mealId);
		setPendingDelete(null);
	}, [pendingDelete, removeFood]);

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
							onRequestDelete={requestDelete}
						/>
					)}
				</ScrollView>
			</SafeAreaView>
			<ConfirmDeleteModal
				visible={pendingDelete !== null}
				onConfirm={confirmDelete}
				onDismiss={dismissDelete}
				modalText="Do you want to delete the entry?"
			/>
		</>
	);
}

const styles = StyleSheet.create({
	title: {
		marginBottom: spacing.xl,
	},

	emptyScrollContent: {
		flexGrow: 1,
	},

	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
