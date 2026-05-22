import Button from "@/components/Button";
import FormInput from "@/components/forms/FormInput";
import { colors, globalStyles } from "@/styles/global";
import {
	calculateAshPCT,
	calculateKcalPer100g,
} from "@/utils/calorieCalculator";
import { FoodItem, NutritionData } from "@shared/types/meal";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

type FoodItemFormData = Pick<
	FoodItem,
	| "name"
	| "brand"
	| "foodType"
	| "proteinPCT"
	| "fatPCT"
	| "fiberPCT"
	| "moisturePCT"
	| "ashPCT"
	| "servingSizeG"
>;

export default function AddFoodScreen() {
	const { control, handleSubmit } = useForm<FoodItemFormData>({
		defaultValues: {
			name: "",
			brand: "",
			foodType: "wet",
			ashPCT: undefined,
			proteinPCT: 0,
			fatPCT: 0,
			fiberPCT: 0,
			moisturePCT: 0,
			servingSizeG: 0,
		},
	});

	const foodItem = useWatch({ control });

	const nutrition = foodItem as NutritionData;
	const kcalPreview = calculateKcalPer100g(nutrition);

	const ash = calculateAshPCT(foodItem.ashPCT, nutrition.foodType);

	const percentageWarning =
		nutrition.proteinPCT +
			nutrition.fatPCT +
			nutrition.fiberPCT +
			nutrition.moisturePCT +
			ash >
		100;

	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
				<View style={styles.rowContainer}>
					<View style={styles.halfInputWidth}>
						<FormInput
							name="name"
							label="Name"
							placeholder="Enter Food's Name"
							control={control}
						/>
					</View>

					<View style={styles.halfInputWidth}>
						<FormInput
							name="brand"
							label="Brand"
							placeholder="Enter Brand Name"
							control={control}
						/>
					</View>
				</View>
				{/* place holder, foodType will be a dropdown later */}
				<FormInput
					name="foodType"
					label="Type"
					placeholder="Pick wet or dry food"
					control={control}
				/>

				<View style={styles.rowContainer}>
					<View style={styles.halfInputWidth}>
						<FormInput
							name="proteinPCT"
							label="Protein"
							placeholder="Enter protein %"
							keyboardType="numeric"
							control={control}
						/>
					</View>
					<View style={styles.halfInputWidth}>
						<FormInput
							name="fatPCT"
							label="Fat"
							placeholder="Enter fat %"
							keyboardType="numeric"
							control={control}
						/>
					</View>
					<View style={styles.halfInputWidth}>
						<FormInput
							name="fiberPCT"
							label="Fiber"
							placeholder="Enter fiber %"
							keyboardType="numeric"
							control={control}
						/>
					</View>
				</View>

				<View style={styles.rowContainer}>
					<View style={styles.halfInputWidth}>
						<FormInput
							name="moisturePCT"
							label="Moisture"
							placeholder="Enter moisture %"
							keyboardType="numeric"
							control={control}
						/>
					</View>
					<View style={styles.halfInputWidth}>
						<FormInput
							name="ashPCT"
							label="Ash"
							placeholder="Defaults: 1.5% wet, 2% dry"
							keyboardType="numeric"
							control={control}
						/>
					</View>
				</View>
				<FormInput
					name="servingSizeG"
					label="Serving size:"
					placeholder="Enter serving size in grams"
					keyboardType="numeric"
					control={control}
				/>
			</View>

			<Button
				accessibilityLabel="Save button"
				onPress={() => {
					console.log(`Saving food: ${foodItem.name}`);
					console.log(`Saving brand: ${foodItem.brand}`);
					console.log(`Saving type: ${foodItem.foodType}`);
					console.log(`Saving ash: ${foodItem.ashPCT}`);
					console.log(`Saving protein: ${foodItem.proteinPCT}`);
					console.log(`Saving fat: ${foodItem.fatPCT}`);
					console.log(`Saving fiber: ${foodItem.fiberPCT}`);
					console.log(`Saving moist: ${foodItem.moisturePCT}`);
					console.log(`Saving serving: ${foodItem.servingSizeG}`);
				}}
			>
				<Text style={styles.buttonText}>Save</Text>
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "flex-start",
		backgroundColor: colors.background,
	},

	inputContainer: {
		marginTop: 30,
		marginBottom: 10,
	},

	rowContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 10,
	},

	halfInputWidth: {
		flex: 1,
	},

	textColor: {
		color: colors.text,
	},

	buttonText: {
		color: colors.text,
		fontSize: 16,
		fontWeight: "600",
	},
});
