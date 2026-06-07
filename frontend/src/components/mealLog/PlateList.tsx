import { colors, icons } from "@/styles/global";
import { ScrollView, StyleSheet, View } from "react-native";
import FormInput from "../forms/FormInput";
import { Ionicons } from "@expo/vector-icons";
import { calculateCaloriesFromServing } from "@/utils/calorieCalculator";
import { Control } from "react-hook-form";
import PlateListItem from "./PlateListItem";
import { AddMealForm, PlateFormItem } from "@/types/AddMealForm";

type PlateListProps = {
	fields: Record<"id", string>[];
	watchedFieldArray: PlateFormItem[];
	control: Control<AddMealForm>;
};

export default function PlateList({
	fields,
	watchedFieldArray,
	control,
}: PlateListProps) {
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
					<View style={styles.cardRowContainer} key={item.id}>
						{/* icon */}
						<View style={styles.left}>
							<Ionicons
								name="fish-outline"
								size={icons.sizeM}
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
								fieldContainerStyle={styles.gramInputContainer}
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
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 20,
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

	gramInputContainer: {
		width: 60,
		paddingHorizontal: 2,
		marginBottom: 0,
	},
});
