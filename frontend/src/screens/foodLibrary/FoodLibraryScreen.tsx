import EmptyState from "@/components/EmptyState";
import FoodLibraryList from "@/components/foodLibrary/FoodLibraryList";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import useFoods from "@/hooks/foods/useFoods";
import { colors, globalStyles, spacing, typography } from "@/styles/global";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FoodLibraryScreen() {
	const { foods, isLoading, isError, error } = useFoods();

	// data from tanstack can be undefined if it is we send an empty array.
	const foodLibrary = foods ?? [];
	const isEmpty = foodLibrary.length === 0;
	// TODO: replace with useDeleteFood()
	const removeFood = {};
	//const removeFood = useFoodLibrary((s) => s.removeFood);

	// modal code
	const [pendingDelete, setPendingDelete] = useState<{
		foodId: string;
	} | null>(null);

	// necessary for handling who swiped
	const openSwipeRowId = useSharedValue<string | null>(null);

	const requestDelete = useCallback((foodId: string) => {
		console.log("requestDelete Food Item:", foodId);
		setPendingDelete({ foodId });
	}, []);

	const dismissDelete = useCallback(() => {
		setPendingDelete(null);
	}, []);

	const confirmDelete = useCallback(async () => {
		if (!pendingDelete) return;

		// TODO: replace with Tanstack
		// send remove food request to Database
		//await removeFood(pendingDelete.foodId);
		setPendingDelete(null);
	}, [pendingDelete, removeFood]);

	// TODO: Replace with a proper UI
	if (isLoading) {
		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.loadingText}>Loading Foods...</Text>
			</View>
		);
	}

	// TODO: Replace with a proper UI
	if (isError) {
		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.loadingText}>
					{error
						? error.message
						: "Something went wrong fetching the food library"}
					...
				</Text>
			</View>
		);
	}

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
							openSwipeRowId={openSwipeRowId}
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

	loadingText: {
		color: colors.primary,
		fontSize: typography.body,
	},
});
