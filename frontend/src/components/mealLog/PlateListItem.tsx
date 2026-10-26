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
	return (
		<View style={styles.card}>
			<Text
				style={globalStyles.cardTitle}
				numberOfLines={1}
				ellipsizeMode="tail"
			>
				{watchedFieldArray[index].name}
			</Text>
			<View style={styles.nutritionContainer}>
				<Text style={styles.nutritionLabel}>
					P:
					{watchedFieldArray[index].proteinPCT}%
				</Text>
				<Text style={styles.nutritionLabel}>
					F:
					{watchedFieldArray[index].fatPCT}%
				</Text>
				<Text style={styles.nutritionLabel}>
					M:
					{watchedFieldArray[index].moisturePCT}%
				</Text>
			</View>
			<View style={styles.nutritionContainer}>
				<Text style={styles.nutritionLabel}>
					Fib:
					{watchedFieldArray[index].fiberPCT}%
				</Text>
				<Text style={styles.nutritionLabel}>
					{displayKcal}
					<Ionicons
						name="flame-sharp"
						size={icons.sm}
						color={colors.text}
					/>
				</Text>
			</View>
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

	nutritionLabel: {
		fontSize: typography.caption,
		color: colors.textSecondary,
	},
});
