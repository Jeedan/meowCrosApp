import {
	colors,
	globalStyles,
	icons,
	spacing,
	typography,
} from "@/styles/global";
import { PlateFormItem } from "@/types/AddMealForm";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type PlateListItemProps = {
	watchedFieldArray: PlateFormItem[];
	index: number;
	displayKcal: number;
};

export default function PlateListItem({
	watchedFieldArray,
	index,
	displayKcal,
}: PlateListItemProps) {
	//TODO: match design of meals and food cards
	const nutritionCellFirstRow = [
		{
			label: "Protein",
			value: `${watchedFieldArray[index].proteinPCT}%`,
		},
		{
			label: "Fat",
			value: `${watchedFieldArray[index].fatPCT}%`,
		},
	];

	const nutritionCellSecondRow = [
		{
			label: "Fiber",
			value: `${watchedFieldArray[index].fiberPCT}%`,
		},
		{
			label: "Moisture",
			value: `${watchedFieldArray[index].moisturePCT}%`,
		},
	];

	return (
		<View style={styles.card}>
			<Text
				style={globalStyles.cardTitle}
				numberOfLines={1}
				ellipsizeMode="tail"
			>
				{watchedFieldArray[index].name}
			</Text>

			{/* Nutrition Grid */}
			{/* Row 1 */}
			<View style={styles.nutritionGrid}>
				{nutritionCellFirstRow.map((item) => (
					<View
						style={styles.nutritionCell}
						key={watchedFieldArray[index].id + item.label}
					>
						<Text style={styles.nutritionLabel}>{item.label}</Text>
						<Text style={styles.nutritionValue}>{item.value}</Text>
					</View>
				))}
			</View>
			{/* Row 2 */}
			<View style={styles.nutritionGrid}>
				{nutritionCellSecondRow.map((item) => (
					<View
						style={styles.nutritionCell}
						key={watchedFieldArray[index].id + item.label}
					>
						<Text style={styles.nutritionLabel}>{item.label}</Text>
						<Text style={styles.nutritionValue}>{item.value}</Text>
					</View>
				))}
			</View>

			<Text style={styles.nutritionValue}>
				{displayKcal}
				<Ionicons
					name="flame-sharp"
					size={icons.sm}
					color={colors.text}
				/>
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 3,
		overflow: "hidden",
		paddingHorizontal: spacing.xs,
	},

	nutritionContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "baseline",
		gap: spacing.sm,
		marginTop: spacing.xs,
	},

	nutritionGrid: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "baseline",
		gap: spacing.lg,
		paddingBottom: spacing.xxs,
	},

	nutritionCell: {
		flexDirection: "row",
		alignItems: "baseline",
		gap: spacing.xxs,
	},

	nutritionValue: {
		fontSize: typography.caption,
		fontWeight: "400",
		color: colors.text,
	},

	nutritionLabel: {
		fontSize: typography.caption,
		color: colors.textSecondary,
	},
});
