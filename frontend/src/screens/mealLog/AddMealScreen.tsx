import Button from "@/components/Button";
import { useFeedingLog, useSelectedFood } from "@/store/store";
import { colors, globalStyles, icons } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

export default function AddMealScreen() {
	const selectedFood = useSelectedFood((state) => state.selectedFood);
	const feedingLog = useFeedingLog((state) => state.feedingLog);
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
						// todo: display card + grams input in a row
					<View style={styles.plateContainer}>
						{fields.map((item, index) => (
							<View style={styles.card} key={item.id}>
								<Text style={styles.textColor}>
									{watchedFieldArray[index].name}
								</Text>
								<View style={styles.nutritionContainer}>
									<Text style={styles.textColor}>
										P:{watchedFieldArray[index].proteinPCT}%
									</Text>
									<Text style={styles.textColor}>
										F:{watchedFieldArray[index].fatPCT}%
									</Text>
									<Text style={styles.textColor}>
										M:{watchedFieldArray[index].moisturePCT}
										%
									</Text>
									<Text style={styles.textColor}>
										Fib:{watchedFieldArray[index].fiberPCT}%
									</Text>
								</View>
								<Text style={styles.textColor}>kcal:</Text>
							</View>
						))}
						<Button onPress={onPressHandler}>
							<Text style={styles.textColor}>Pick Food</Text>
						</Button>
						<View style={styles.confirmButton}>
							<Button onPress={onConfirmHandler} disabled={true}>
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
		alignItems: "flex-start",
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

	card: {
		width: 250,
		backgroundColor: colors.cardBackground,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 15,
		marginBottom: 10,
	},

	nutritionContainer: {
		flexDirection: "row",
		gap: 6,
		marginTop: 2,
		marginBottom: 2,
	},
});
