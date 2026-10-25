import { colors, icons, radius, spacing } from "@/styles/global";
import { ScrollView, StyleSheet, View } from "react-native";
import FormInput from "../forms/FormInput";
import { Ionicons } from "@expo/vector-icons";
import { calculateCaloriesFromServing } from "@/utils/calorieCalculator";
import { Control, UseFieldArrayRemove } from "react-hook-form";
import PlateListItem from "./PlateListItem";
import { AddMealForm, PlateFormItem } from "@/types/AddMealForm";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import { useCallback, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import SharedSwipeRow from "../gestures/SharedSwipeRow";

type PlateListProps = {
	fields: Record<"id", string>[];
	watchedFieldArray: PlateFormItem[];
	control: Control<AddMealForm>;
	remove: UseFieldArrayRemove;
};

export default function PlateList({
	fields,
	watchedFieldArray,
	control,
	remove,
}: PlateListProps) {
	// const handlerDelete = (swipeable: SwipeableMethods, index: number) => {
	// 	swipeable.close();
	// 	remove(index);
	// };

	// modal code
	// todo update with proper values from ZOD and backend
	const [pendingDelete, setPendingDelete] = useState<{
		foodId: number;
	} | null>(null);

	const requestDelete = useCallback((foodId: number) => {
		setPendingDelete({ foodId });
	}, []);

	const dismissDelete = useCallback(() => {
		setPendingDelete(null);
	}, []);

	const confirmDelete = useCallback(() => {
		if (!pendingDelete) return;

		//removePlateItem(pendingDelete.feedingLogId, pendingDelete.mealId);
		// TODO: add deleteUser function
		// replace null with the function in the depency array
		console.log("sending delete request to the backend");
		remove(pendingDelete.foodId);
		setPendingDelete(null);
	}, [pendingDelete, remove]);

	const openSwipeRowId = useSharedValue<string | null>(null);
	return (
		<>
			<ScrollView
				style={{ flex: 1 }}
				contentContainerStyle={styles.plateContainer}
			>
				{fields.map((item, index) => {
					const kcal = calculateCaloriesFromServing(
						watchedFieldArray[index].gramsServed,
						watchedFieldArray[index],
					);

					const displayKcal = isNaN(kcal) ? 0 : kcal;
					return (
						<SharedSwipeRow
							rowId={watchedFieldArray[index].id}
							onDeletePress={() => requestDelete(index)}
							openSwipeRowId={openSwipeRowId}
						>
							<View style={styles.cardRowContainer} key={item.id}>
								{/* icon */}
								<View style={styles.left}>
									<Ionicons
										name="fish-outline"
										size={icons.lg}
										color={colors.text}
									></Ionicons>
								</View>

								{/* Card */}
								<PlateListItem
									index={index}
									watchedFieldArray={watchedFieldArray}
									displayKcal={displayKcal}
								/>

								{/* Input */}
								<View style={styles.right}>
									<FormInput
										fieldContainerStyle={
											styles.gramInputContainer
										}
										control={control}
										name={`plateArray.${index}.gramsServed`}
										placeholder="serving in grams"
										key={item.id}
										keyboardType="numeric"
									/>
								</View>
							</View>
						</SharedSwipeRow>
					);
				})}
			</ScrollView>

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
	plateContainer: {
		alignItems: "stretch",
	},

	cardRowContainer: {
		backgroundColor: colors.cardBackground,
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.lg,
		borderRadius: radius.lg,
		gap: spacing.sm,
	},

	left: {
		flex: 1,
		flexShrink: 0,
		justifyContent: "center",
		alignItems: "center",
	},

	right: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	gramInputContainer: {
		paddingHorizontal: spacing.xxs,
		marginBottom: spacing.none,
	},

	deleteButton: {
		backgroundColor: colors.alert,
		marginTop: spacing.none,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.md,
		borderRadius: radius.lg,
	},
});
