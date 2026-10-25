import {
	colors,
	globalStyles,
	radius,
	spacing,
	typography,
} from "@/styles/global";
import { FoodItem } from "@shared/types/meal";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ComponentProps = {
	onPress: (id: string) => void;
	selectedId: string | null;
	foodItem: FoodItem;
};

export default function FoodPickerItem({
	onPress,
	selectedId,
	foodItem,
}: ComponentProps) {
	const foodId = foodItem.id;
	const isSelected = foodId === selectedId;

	return (
		<View
			style={[
				styles.centered,
				isSelected ? styles.selected : styles.notSelected,
			]}
		>
			<Pressable
				onPress={() => {
					onPress(foodId);
				}}
			>
				<Text style={globalStyles.cardHeader}>{foodItem.name}</Text>
				<View style={styles.row}>
					<Text style={styles.nutritionLabel}>
						Brand: {foodItem.brand}
					</Text>
					<Text style={styles.nutritionLabel}>
						type: {foodItem.foodType}
					</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.nutritionLabel}>
						Protein:
						<Text style={globalStyles.cardLabelBold}>
							{" "}
							{foodItem.proteinPCT}%
						</Text>
					</Text>
					<Text style={styles.nutritionLabel}>
						Fat:
						<Text style={globalStyles.cardLabelBold}>
							{" "}
							{foodItem.fatPCT}%
						</Text>
					</Text>
					<Text style={styles.nutritionLabel}>
						Fiber:
						<Text style={globalStyles.cardLabelBold}>
							{" "}
							{foodItem.fiberPCT}%
						</Text>
					</Text>
					<Text style={globalStyles.cardLabelBold}>
						Moisture:{" "}
						<Text style={globalStyles.cardLabelBold}>
							{" "}
							{foodItem.moisturePCT}%
						</Text>
					</Text>
				</View>

				<Text style={styles.nutritionLabel}>
					Serving size:{" "}
					<Text style={globalStyles.cardLabelBold}>
						{" "}
						{foodItem.servingSizeG}g
					</Text>
				</Text>
				<Text style={styles.lastUsed}>
					last used: {foodItem.lastUsedAt.toDateString()}
				</Text>
			</Pressable>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.background,
	},

	title: {
		marginBottom: spacing.xl,
	},

	centered: {
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		padding: spacing.md,
		borderRadius: radius.xl,
		backgroundColor: colors.cardBackground,
		marginBottom: spacing.sm,
	},

	row: {
		flexDirection: "row",
		flexWrap: "wrap",
		rowGap: spacing.xxs,
		columnGap: spacing.sm,
	},

	lastUsed: {
		fontSize: typography.caption,
		color: colors.textSecondary,
	},

	selected: {
		borderColor: colors.primary,
		borderWidth: 1,
	},

	notSelected: {
		borderWidth: spacing.none,
	},

	nutritionLabel: {
		fontSize: typography.caption,
		color: colors.textSecondary,
	},
});
