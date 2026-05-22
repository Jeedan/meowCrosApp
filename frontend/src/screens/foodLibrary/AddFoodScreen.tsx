import Button from "@/components/Button";
import FormInput from "@/components/forms/FormInput";
import { colors, globalStyles } from "@/styles/global";
import {
	calculateAshPCT,
	calculateKcalPer100g,
	warningOver100percent,
} from "@/utils/calorieCalculator";
import { convertToNumber } from "@/utils/convertToNumber";
import {
	FoodItem,
	NutritionData,
	NutritionFormDisplayData,
} from "@shared/types/meal";
import { useForm, useWatch } from "react-hook-form";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FoodItemFormDisplayData = Pick<
	FoodItem,
	"name" | "brand" | "servingSizeG"
> &
	NutritionFormDisplayData;

export default function AddFoodScreen() {
	const { control, handleSubmit } = useForm<FoodItemFormDisplayData>({
		defaultValues: {
			name: "",
			brand: "",
			foodType: "wet",
			ashPCT: undefined,
			proteinPCT: undefined,
			fatPCT: undefined,
			fiberPCT: undefined,
			moisturePCT: undefined,
			servingSizeG: undefined,
		},
	});

	const foodItemDisplay = useWatch({ control });

	const defaultFoodType = foodItemDisplay.foodType ?? "wet";
	const nutrition: NutritionData = {
		foodType: defaultFoodType,
		proteinPCT: convertToNumber(foodItemDisplay.proteinPCT) ?? 0,
		fatPCT: convertToNumber(foodItemDisplay.fatPCT) ?? 0,
		fiberPCT: convertToNumber(foodItemDisplay.fiberPCT) ?? 0,
		moisturePCT: convertToNumber(foodItemDisplay.moisturePCT) ?? 0,
		ashPCT: calculateAshPCT(
			convertToNumber(foodItemDisplay.ashPCT),
			defaultFoodType,
		),
	};

	const kcalPreview = calculateKcalPer100g(nutrition);

	const percentageWarning = warningOver100percent(nutrition);

	return (
		<SafeAreaView style={globalStyles.scrollContainer} edges={["top"]}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={100}
			>
				<ScrollView
					contentContainerStyle={styles.scrollContainer}
					keyboardShouldPersistTaps="handled"
				>
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

							<Button
								accessibilityLabel="Save button"
								onPress={() => {
									console.log(
										`Saving food: ${foodItemDisplay.name}`,
									);
									console.log(
										`Saving brand: ${foodItemDisplay.brand}`,
									);
									console.log(
										`Saving type: ${nutrition.foodType}`,
									);
									console.log(
										`Saving ash: ${nutrition.ashPCT}`,
									);
									console.log(
										`Saving protein: ${nutrition.proteinPCT}`,
									);
									console.log(
										`Saving fat: ${nutrition.fatPCT}`,
									);
									console.log(
										`Saving fiber: ${nutrition.fiberPCT}`,
									);
									console.log(
										`Saving moist: ${nutrition.moisturePCT}`,
									);

									console.log(
										`Saving serving: ${foodItemDisplay.servingSizeG}`,
									);
								}}
							>
								<Text style={styles.buttonText}>Save</Text>
							</Button>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	scrollContainer: {
		backgroundColor: colors.background,
	},

	container: {
		padding: 20,
		paddingBottom: 40,
	},

	inputContainer: {
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
