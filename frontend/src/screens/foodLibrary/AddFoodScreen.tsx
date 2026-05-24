import Button from "@/components/Button";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import { incrementId } from "@/data/dummyData";
import { useFoodLibrary } from "@/store/store";
import { colors, globalStyles } from "@/styles/global";
import {
	calculateAshPCT,
	calculateKcalPer100g,
	warningOver100percent,
} from "@/utils/calorieCalculator";
import { daysAgo } from "@/utils/dateUtils";
import { FoodItem, NutritionData } from "@shared/types/meal";
import { router } from "expo-router";
import { useForm, useWatch } from "react-hook-form";
import {
	Keyboard,
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
	NutritionData;

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
			servingSizeG: 85,
		},
		mode: "onBlur",
	});

	const foodItemDisplay = useWatch({ control });

	// Zustand store
	const addFood = useFoodLibrary((s) => s.addFood);

	const defaultFoodType = foodItemDisplay.foodType ?? "wet";
	const nutrition: NutritionData = {
		foodType: defaultFoodType,
		proteinPCT: foodItemDisplay.proteinPCT ?? 0,
		fatPCT: foodItemDisplay.fatPCT ?? 0,
		fiberPCT: foodItemDisplay.fiberPCT ?? 0,
		moisturePCT: foodItemDisplay.moisturePCT ?? 0,
		ashPCT: calculateAshPCT(foodItemDisplay.ashPCT, defaultFoodType),
	};

	const kcalPreview = calculateKcalPer100g(nutrition);
	const percentageWarning = warningOver100percent(nutrition);
	const exceedsErrorMessage =
		"Percentages exceed 100% - please check the label values";

	const handlerSubmit = (data: FoodItemFormDisplayData) => {
		console.log(`ash from data: ${data.ashPCT}`);
		const food: FoodItem = {
			id: incrementId(),
			name: data.name ?? "",
			brand: data.brand ?? "",
			foodType: data.foodType,
			proteinPCT: data.proteinPCT,
			fatPCT: data.fatPCT,
			fiberPCT: data.fiberPCT,
			moisturePCT: data.moisturePCT,
			ashPCT: foodItemDisplay.ashPCT,
			servingSizeG: data.servingSizeG ?? 0,
			lastUsedAt: daysAgo(0),
			created_at: daysAgo(0),
			updated_at: daysAgo(0),
		};

		addFood(food);
		console.log(`food: ${food.name}`);
		console.log(`brand: ${food.brand}`);
		console.log(`type: ${food.foodType}`);
		console.log(`ash: ${food.ashPCT}`);
		console.log(`protein: ${food.proteinPCT}`);
		console.log(`fat: ${food.fatPCT}`);
		console.log(`fiber: ${food.fiberPCT}`);
		console.log(`moist: ${food.moisturePCT}`);
		console.log(`serving: ${food.servingSizeG}`);
		console.log(`kcal: ${kcalPreview}`);
		router.back();
	};

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
										rules={{
											required: "This field is required",
										}}
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
							<FormSelect
								control={control}
								name="foodType"
								label="Food type"
								style={styles.foodTypeButton}
								options={[
									{ label: "wet", value: "wet" },
									{ label: "dry", value: "dry" },
								]}
							/>

							<View style={styles.rowContainer}>
								<View style={styles.halfInputWidth}>
									<FormInput
										name="proteinPCT"
										label="Protein"
										placeholder="Enter protein %"
										keyboardType="numeric"
										control={control}
										rules={{
											required: "This field is required",
										}}
									/>
								</View>
								<View style={styles.halfInputWidth}>
									<FormInput
										name="fatPCT"
										label="Fat"
										placeholder="Enter fat %"
										keyboardType="numeric"
										control={control}
										rules={{
											required: "This field is required",
										}}
									/>
								</View>
								<View style={styles.halfInputWidth}>
									<FormInput
										name="fiberPCT"
										label="Fiber"
										placeholder="Enter fiber %"
										keyboardType="numeric"
										control={control}
										rules={{
											required: "This field is required",
										}}
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
										rules={{
											required: "This field is required",
										}}
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

							<Text style={styles.sectionTitle}>
								Calories per 100g:{" "}
								<Text
									style={[
										!percentageWarning
											? styles.calorieGood
											: styles.calorieBad,
									]}
								>
									{kcalPreview}
									kcal
								</Text>
							</Text>
							{percentageWarning ? (
								<Text
									style={[
										styles.sectionTitle,
										styles.errorMessage,
									]}
								>
									{exceedsErrorMessage}
								</Text>
							) : null}

							<FormInput
								name="servingSizeG"
								label="Recommended serving:"
								placeholder="Enter serving size in grams"
								keyboardType="numeric"
								control={control}
								rules={{ required: "This field is required" }}
							/>

							<Button
								accessibilityLabel="Save button"
								onPress={() => {
									Keyboard.dismiss();
									handleSubmit(handlerSubmit)();
								}}
							>
								<Text style={styles.buttonText}>
									Add Food to Library
								</Text>
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

	buttonText: {
		color: colors.text,
		fontSize: 16,
		fontWeight: "600",
	},
	errorMessage: {
		fontSize: 14,
		color: colors.alert,
	},

	foodTypeButton: {
		paddingVertical: 6,
	},

	sectionTitle: {
		fontSize: 22,
		fontWeight: "600",
		color: colors.text,
		marginBottom: 16,
	},

	calorieGood: {
		color: colors.primary,
	},

	calorieBad: {
		color: colors.alert,
	},
});
