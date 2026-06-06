import { colors, globalStyles, icons } from "@/styles/global";
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
				<Text style={globalStyles.cardLabel}>
					P:
					{watchedFieldArray[index].proteinPCT}%
				</Text>
				<Text style={globalStyles.cardLabel}>
					F:
					{watchedFieldArray[index].fatPCT}%
				</Text>
				<Text style={globalStyles.cardLabel}>
					M:
					{watchedFieldArray[index].moisturePCT}%
				</Text>
			</View>
			<View style={styles.nutritionContainer}>
				<Text style={globalStyles.cardLabel}>
					Fib:
					{watchedFieldArray[index].fiberPCT}%
				</Text>
				<Text style={globalStyles.cardLabel}>
					{displayKcal}
					<Ionicons
						name="flame-sharp"
						size={icons.sizeXS}
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
		paddingHorizontal: 4,
	},

	nutritionContainer: {
		flexDirection: "row",
		gap: 6,
		marginTop: 2,
		marginBottom: 2,
	},
});
