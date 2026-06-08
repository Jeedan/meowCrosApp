import Button from "@/components/Button";
import EmptyPlateState from "@/components/mealLog/EmptyPlateState";
import PlateList from "@/components/mealLog/PlateList";
import { incrementId } from "@/data/dummyData";
import { useFeedingLog, useSelectedFood } from "@/store/store";
import { colors, globalStyles, icons } from "@/styles/global";
import { AddMealForm, PlateFormItem } from "@/types/AddMealForm";
import { calculateCaloriesFromServing } from "@/utils/calorieCalculator";
import { daysAgo } from "@/utils/dateUtils";
import { Ionicons } from "@expo/vector-icons";
import { FeedingLog, PlateItem } from "@shared/types/meal";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

export default function AddMealScreen() {
	const selectedFood = useSelectedFood((state) => state.selectedFood);
	const addMeal = useFeedingLog((state) => state.addMeal);
	const clearSelectedFood = useSelectedFood(
		(state) => state.clearSelectedFood,
	);

	const { control, handleSubmit, watch } = useForm<AddMealForm>();
	const { fields, append, remove } = useFieldArray({
		control,
		name: "plateArray",
	});

	const watchedFieldArray = watch("plateArray");

	const isEmptyPlate =
		watchedFieldArray === undefined || watchedFieldArray.length === 0;

	const onPressHandler = () => {
		router.push("/foodpicker");
	};

	const onConfirmHandler = () => {
		// construct a feedinglog object
		const plate: PlateItem[] = watchedFieldArray.map(
			(item: PlateFormItem) => ({
				id: incrementId(),
				foodId: item.id,
				foodNameSnapshot: item.name,
				foodType: item.foodType,
				proteinPCT: item.proteinPCT,
				fatPCT: item.fatPCT,
				fiberPCT: item.fiberPCT,
				moisturePCT: item.moisturePCT,
				ashPCT: item.ashPCT,
				kcalCalculated: calculateCaloriesFromServing(
					item.gramsServed,
					item,
				),
				gramsServed: item.gramsServed,
			}),
		);

		const log: FeedingLog = {
			id: incrementId(),
			userId: "13",
			loggedAt: daysAgo(0),
			plate: plate,
		};
		addMeal(log);
		router.navigate("/mealslog");
	};

	useEffect(() => {
		if (!selectedFood) return;

		append({
			id: selectedFood.id,
			name: selectedFood.name,
			brand: selectedFood.brand,
			ashPCT: selectedFood.ashPCT,
			foodType: selectedFood.foodType,
			proteinPCT: selectedFood.proteinPCT,
			fatPCT: selectedFood.fatPCT,
			fiberPCT: selectedFood.fiberPCT,
			moisturePCT: selectedFood.moisturePCT,
			servingSizeG: selectedFood.servingSizeG,
			gramsServed: selectedFood.servingSizeG,
		});
		clearSelectedFood();
	}, [selectedFood]);

	const totalPlateCalories = !isEmptyPlate
		? watchedFieldArray.reduce((acc: number, item: PlateFormItem) => {
				const cals = calculateCaloriesFromServing(
					item.gramsServed,
					item,
				);
				const result = acc + cals;
				return isNaN(result) ? 0 : result;
			}, 0)
		: 0;

	useFocusEffect(
		useCallback(() => {
			// Do something when the screen is focused
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
				clearSelectedFood();
			};
		}, []),
	);

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				{/* Plate Header */}
				<Text style={[globalStyles.sectionTitle, styles.textColor]}>
					Your Plate
				</Text>
				{/* empty plate container only show when watchedFieldArray is empty*/}
				{isEmptyPlate ? (
					<EmptyPlateState onPress={onPressHandler} />
				) : (
					// show plate items pick foodand confirm button
					<>
						<PlateList
							control={control}
							fields={fields}
							watchedFieldArray={watchedFieldArray}
							remove={remove}
						/>
						<View style={styles.caloriePreview}>
							<Text style={styles.calorieText}>
								Plate calories: {totalPlateCalories}
								<Ionicons
									name="flame-sharp"
									size={icons.sizeXS}
									color={colors.text}
								/>
							</Text>
						</View>
						<Button
							onPress={onPressHandler}
							style={styles.pickButton}
						>
							<Text style={styles.textColor}>Pick Food</Text>
						</Button>
						<View style={styles.confirmButton}>
							<Button
								onPress={handleSubmit(onConfirmHandler)}
								disabled={isEmptyPlate}
							>
								<Text style={styles.textColor}>Confirm</Text>
							</Button>
						</View>
					</>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		backgroundColor: colors.background,
		paddingVertical: 20,
		paddingHorizontal: 20,
	},

	content: {
		flex: 1,
		width: "100%",
	},

	pickButton: {
		backgroundColor: colors.secondary,
	},

	confirmButton: {
		borderRadius: 14,
		marginBottom: 40,
	},

	textColor: {
		color: colors.text,
	},

	caloriePreview: {
		width: "100%",
		justifyContent: "center",
		padding: 20,
		borderRadius: 14,
		borderColor: colors.text,
		borderWidth: 0.1,
		backgroundColor: colors.background,
	},

	calorieText: {
		color: colors.text,
		fontSize: 16,
		fontWeight: "600",
	},
});
