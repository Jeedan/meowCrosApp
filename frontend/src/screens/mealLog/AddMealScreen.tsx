import Button from "@/components/Button";
import EmptyPlateState from "@/components/mealLog/EmptyPlateState";
import PlateList from "@/components/mealLog/PlateList";
import { useFeedingLog, useSelectedFood } from "@/store/store";
import {
	colors,
	globalStyles,
	icons,
	radius,
	spacing,
	typography,
} from "@/styles/global";
import { AddMealForm, PlateFormItem } from "@/types/AddMealForm";
import { calculateCaloriesFromServing } from "@/utils/calorieCalculator";
import { daysAgo } from "@/utils/dateUtils";
import { createMeal } from "@/utils/meals/meals.utils";
import { Ionicons } from "@expo/vector-icons";
import { FeedingLog, PlateItem } from "@shared/types/meal";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
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

	const { loggedAt } = useLocalSearchParams<{ loggedAt?: string }>();
	const onConfirmHandler = async () => {
		// construct a feedinglog object
		const parsedDate = loggedAt ? new Date(loggedAt) : daysAgo(0);
		const loggedDate = Number.isNaN(parsedDate.getTime())
			? daysAgo(0)
			: parsedDate;
		1;
		const items = watchedFieldArray.map((item: PlateFormItem) => ({
			foodId: item.id,
			foodNameSnapshot: item.name,
			foodType: item.foodType,
			proteinPCT: item.proteinPCT,
			fatPCT: item.fatPCT,
			fiberPCT: item.fiberPCT,
			moisturePCT: item.moisturePCT,
			ashPCT: item.ashPCT,
			gramsServed: item.gramsServed,
		}));

		console.log("add meal screen:", JSON.stringify(items, null, 2));
		const meal = createMeal({
			loggedAt: loggedDate,
			userId: "13",
			items: items,
		});

		await addMeal(meal);
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

	if (isEmptyPlate) {
		// empty plate container only show when watchedFieldArray is empty
		// show plate items pick foodand confirm button
		return <EmptyPlateState onPress={onPressHandler} />;
	}

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				{/* Plate Header */}
				<Text style={[globalStyles.sectionTitle, styles.textColor]}>
					Your Plate
				</Text>

				<PlateList
					control={control}
					fields={fields}
					watchedFieldArray={watchedFieldArray}
					remove={remove}
				/>
				<View style={styles.caloriePreview}>
					<Text style={styles.calorieText}>Plate calories</Text>
					<Text style={styles.calorieText}>
						{totalPlateCalories}
						<Ionicons
							name="flame-sharp"
							size={icons.sm}
							color={colors.text}
						/>
					</Text>
				</View>
				<Button onPress={onPressHandler} style={styles.pickButton}>
					<Text style={styles.textColor}>Pick Food</Text>
				</Button>
				<View style={styles.confirmButton}>
					<Button
						onPress={handleSubmit(onConfirmHandler)}
						disabled={isEmptyPlate}
					>
						<Text style={styles.textColor}>Log Meal</Text>
					</Button>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		backgroundColor: colors.background,
		paddingVertical: spacing.xl,
		paddingHorizontal: spacing.xl,
	},

	content: {
		flex: 1,
		width: "100%",
	},

	pickButton: {
		backgroundColor: colors.secondary,
		marginBottom: spacing.lg,
	},

	confirmButton: {
		borderRadius: radius.lg,
		marginBottom: spacing.huge,
	},

	textColor: {
		color: colors.text,
	},

	caloriePreview: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: spacing.xl,
		borderRadius: radius.lg,
		borderColor: colors.text,
		borderWidth: 0.1,
		backgroundColor: colors.background,
		marginBottom: spacing.lg,
	},

	calorieText: {
		color: colors.text,
		fontSize: typography.body,
		fontWeight: "600",
	},
});
