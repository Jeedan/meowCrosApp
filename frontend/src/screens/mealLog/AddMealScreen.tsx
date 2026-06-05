import Button from "@/components/Button";
import FormInput from "@/components/forms/FormInput";
import { incrementId } from "@/data/dummyData";
import { useFeedingLog, useSelectedFood } from "@/store/store";
import { colors, globalStyles, icons } from "@/styles/global";
import { SelectedFoodItem } from "@/types/SelectedFood";
import { calculateCaloriesFromServing } from "@/utils/calorieCalculator";
import { daysAgo } from "@/utils/dateUtils";
import { Ionicons } from "@expo/vector-icons";
import { FeedingLog, PlateItem } from "@shared/types/meal";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

type AddMealForm = {
	plateArray: SelectedFoodItem[];
};

export default function AddMealScreen() {
	const selectedFood = useSelectedFood((state) => state.selectedFood);
	const addMeal = useFeedingLog((state) => state.addMeal);
	const clearSelectedFood = useSelectedFood(
		(state) => state.clearSelectedFood,
	);

	const { control, handleSubmit, watch } = useForm();
	const { fields, append } = useFieldArray({
		control,
		name: "plateArray",
	});

	const watchedFieldArray = watch("plateArray");

	console.log("watchedFieldArray", watchedFieldArray);

	const isEmptyPlate =
		watchedFieldArray === undefined || watchedFieldArray.length === 0;

	console.log("is plate empty?", isEmptyPlate);
	console.log("selectedFood", JSON.stringify(selectedFood));

	const onPressHandler = () => {
		console.log("navigating to FoodPickerScreen");
		router.push("/foodpicker");
	};

	const onConfirmHandler = () => {
		console.log("Add meal to Feedinglog's plate[]");
		// construct a feedinglog object
		const plate: PlateItem[] = watchedFieldArray.map((item: any) => ({
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
		}));

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
		? watchedFieldArray.reduce((acc: number, item: any) => {
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
			<View>
				{/* Plate Header */}
				<Text style={[globalStyles.sectionTitle, styles.textColor]}>
					Your Plate
				</Text>
				{/* empty plate container only show when watchedFieldArray is empty*/}
				{isEmptyPlate ? (
					<View style={[styles.emptyPlate, styles.row]}>
						<View>
							<Ionicons
								name="alert-circle"
								size={icons.sizeS}
								color={colors.text}
							></Ionicons>
						</View>

						<View style={styles.halfWidth}>
							<Text style={[styles.emptyPlateText]}>
								Your Plate is empty, Add Food using the food
								picker.
							</Text>
						</View>

						<View>
							<Button
								onPress={onPressHandler}
								style={styles.pickButton}
							>
								<Text style={styles.textColor}>Pick Food</Text>
							</Button>
						</View>
					</View>
				) : (
					// show plate items pick foodand confirm button
					<View style={styles.plateContainer}>
						{fields.map((item, index) => {
							const kcal = calculateCaloriesFromServing(
								watchedFieldArray[index].gramsServed,
								watchedFieldArray[index],
							);

							const displayKcal = isNaN(kcal) ? 0 : kcal;
							return (
								<View
									style={styles.cardRowContainer}
									key={item.id}
								>
									{/* icon */}
									<View style={styles.left}>
										<Ionicons
											name="fish-outline"
											size={icons.sizeM}
											color={colors.text}
										></Ionicons>
									</View>
									{/* Card */}
									<View style={styles.card}>
										<Text
											style={globalStyles.cardTitle}
											numberOfLines={1}
											ellipsizeMode="tail"
										>
											{watchedFieldArray[index].name}
										</Text>
										<View style={styles.nutritionContainer}>
											<Text
												style={globalStyles.cardLabel}
											>
												P:
												{
													watchedFieldArray[index]
														.proteinPCT
												}
												%
											</Text>
											<Text
												style={globalStyles.cardLabel}
											>
												F:
												{
													watchedFieldArray[index]
														.fatPCT
												}
												%
											</Text>
											<Text
												style={globalStyles.cardLabel}
											>
												M:
												{
													watchedFieldArray[index]
														.moisturePCT
												}
												%
											</Text>
										</View>
										<View style={styles.nutritionContainer}>
											<Text
												style={globalStyles.cardLabel}
											>
												Fib:
												{
													watchedFieldArray[index]
														.fiberPCT
												}
												%
											</Text>
											<Text
												style={globalStyles.cardLabel}
											>
												{displayKcal}
												<Ionicons
													name="flame-sharp"
													size={icons.sizeXS}
													color={colors.text}
												/>
											</Text>
										</View>
									</View>
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
							);
						})}

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
						<Button onPress={onPressHandler}>
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
					</View>
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

	row: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 10,
	},

	halfWidth: {
		flex: 1,
		marginHorizontal: 10,
	},

	emptyPlate: {
		height: 100,
		borderRadius: 15,
		backgroundColor: colors.secondary,
	},

	emptyPlateText: {
		fontSize: 16,
		color: colors.text,
		textAlign: "left",
	},

	pickButton: {
		borderRadius: 30,
		marginTop: 0,
		backgroundColor: "rgba(0, 119, 255, 1)",
	},

	confirmButton: {
		borderRadius: 15,
		alignItems: "flex-end",
	},

	textColor: {
		color: colors.text,
	},

	plateContainer: {
		flex: 1,
		alignItems: "center",
	},

	cardRowContainer: {
		backgroundColor: colors.cardBackground,
		width: "100%",
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 15,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
		gap: 4,
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

	card: {
		flex: 3,
		overflow: "hidden",
		paddingHorizontal: 4,
	},

	nutritionContainer: {
		flexDirection: "row",
		gap: 6,
		marginTop: 2,
		marginBottom: 2,
	},

	gramInputContainer: {
		width: 60,
		paddingHorizontal: 2,
		marginBottom: 0,
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
