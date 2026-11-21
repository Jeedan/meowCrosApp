import Button from "@/components/Button";
import FormInput from "@/components/forms/FormInput";
import FormSelect from "@/components/forms/FormSelect";
import useCreateFood from "@/hooks/foods/useCreateFood";
import { colors, globalStyles, spacing, typography } from "@/styles/global";
import { FoodFormData } from "@/types/AddFoodForm";
import {
	calculateAshPCT,
	calculateKcalPer100g,
	warningOver100percent,
} from "@/utils/calorieCalculator";
import { FoodInput, foodInputSchema } from "@shared/schemas/foods.schema";
import { NutritionData } from "@shared/types/food";
import { router } from "expo-router";
import { FieldPath, useForm, useWatch } from "react-hook-form";
import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddFoodScreen() {
	// TODO: replace with useCreateFood()
	// Zustand store
	//const addFood = useFoodLibrary((s) => s.addFood);
	const createFood = useCreateFood();

	const { control, handleSubmit, setError } = useForm<FoodFormData>({
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

	const defaultFoodType = foodItemDisplay.foodType ?? "wet";
	const nutrition: NutritionData = {
		foodType: defaultFoodType,
		proteinPCT: foodItemDisplay.proteinPCT ?? 0,
		fatPCT: foodItemDisplay.fatPCT ?? 0,
		fiberPCT: foodItemDisplay.fiberPCT ?? 0,
		moisturePCT: foodItemDisplay.moisturePCT ?? 1,
		ashPCT: calculateAshPCT(foodItemDisplay.ashPCT, defaultFoodType),
	};

	const kcalPreview = calculateKcalPer100g(nutrition);
	const percentageWarning = warningOver100percent(nutrition);
	const exceedsErrorMessage =
		"Percentages exceed 100% - please check the label values";

	const handlerSubmit = async (data: FoodFormData) => {
		console.log(`ash from data: ${data.ashPCT}`);
		const result = foodInputSchema.safeParse({
			...data,
			moisturePCT:
				data.moisturePCT == null || data.moisturePCT === 0
					? 1
					: data.moisturePCT,
			brand: data.brand.trim() || null,
			ashPCT: data.ashPCT ?? null,
		});

		if (!result.success) {
			for (const issue of result.error.issues) {
				const field = issue.path[0];

				if (typeof field === "string") {
					setError(field as FieldPath<FoodFormData>, {
						type: "schema",
						message: issue.message,
					});
				}
			}
			return;
		}

		const payload: FoodInput = result.data;
		//await addFood(food);
		const finalFood = await createFood.mutateAsync(payload);
		console.log("Created food:", JSON.stringify(finalFood, null, 2));
		console.log(`kcal: ${kcalPreview}`);
		router.back();
	};

	// TODO: display error toast
	if (createFood.isError) {
		return (
			<View style={{ flex: 1, backgroundColor: colors.background }}>
				<Text style={styles.errorMessage}>
					Could not create food...
				</Text>
			</View>
		);
	}

	return (
		<SafeAreaView style={globalStyles.scrollContainer} edges={["bottom"]}>
			<KeyboardAvoidingView
				style={{ flex: 1, backgroundColor: colors.background }}
				behavior={"padding"}
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
								disabled={createFood.isPending}
							>
								{createFood.isPending ? (
									// TODO: add spinner
									<Text style={styles.buttonText}>
										Creating Food...
									</Text>
								) : (
									<Text style={styles.buttonText}>
										Add Food to Library
									</Text>
								)}
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
		padding: spacing.md,
		paddingBottom: spacing.huge,
	},

	inputContainer: {
		marginBottom: spacing.sm,
	},

	rowContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: spacing.sm,
	},

	halfInputWidth: {
		flex: 1,
	},

	buttonText: {
		color: colors.text,
		fontSize: typography.body,
		fontWeight: "600",
	},
	errorMessage: {
		fontSize: typography.caption,
		color: colors.alert,
	},

	foodTypeButton: {
		paddingVertical: spacing.sm,
	},

	sectionTitle: {
		fontSize: typography.title,
		fontWeight: "600",
		color: colors.text,
		marginBottom: spacing.lg,
	},

	calorieGood: {
		color: colors.primary,
	},

	calorieBad: {
		color: colors.alert,
	},
});
