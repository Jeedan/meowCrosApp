import { colors, icons, radius, spacing } from "@/styles/global";
import { ScrollView, StyleSheet, View } from "react-native";
import FormInput from "../forms/FormInput";
import { Ionicons } from "@expo/vector-icons";
import { calculateCaloriesFromServing } from "@/utils/calorieCalculator";
import { Control, UseFieldArrayRemove } from "react-hook-form";
import PlateListItem from "./PlateListItem";
import { AddMealForm, PlateFormItem } from "@/types/AddMealForm";

import ReanimatedSwipeable, {
	SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import SwipeAction from "../gestures/SwipeAction";
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
	const handlerDelete = (swipeable: SwipeableMethods, index: number) => {
		swipeable.close();
		remove(index);
	};

	return (
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
					<ReanimatedSwipeable
						key={item.id}
						friction={2}
						enableTrackpadTwoFingerGesture
						rightThreshold={50}
						renderRightActions={(progress, drag, swipeable) => (
							<SwipeAction
								prog={progress}
								renderContent={() => {
									return (
										<ConfirmDeleteModal
											onConfirm={() => {
												handlerDelete(swipeable, index);
											}}
											modalText="Do you want to delete the entry?"
											style={styles.deleteButton}
										>
											<Ionicons
												name="trash-outline"
												size={22}
												color={colors.text}
											></Ionicons>
										</ConfirmDeleteModal>
									);
								}}
							/>
						)}
					>
						<View style={styles.cardRowContainer}>
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
					</ReanimatedSwipeable>
				);
			})}
		</ScrollView>
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
		marginBottom: spacing.md,
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
