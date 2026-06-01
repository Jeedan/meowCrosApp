import { colors, globalStyles } from "@/styles/global";
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
					<Text style={globalStyles.cardLabel}>
						Brand: {foodItem.brand}
					</Text>
					<Text style={globalStyles.cardLabel}>
						type: {foodItem.foodType}
					</Text>
				</View>
				<View style={styles.row}>
					<Text style={globalStyles.cardLabel}>
						Protein:
						<Text style={globalStyles.cardLabelBold}>
							{" "}
							{foodItem.proteinPCT}%
						</Text>
					</Text>
					<Text style={globalStyles.cardLabel}>
						Fat:
						<Text style={globalStyles.cardLabelBold}>
							{" "}
							{foodItem.fatPCT}%
						</Text>
					</Text>
					<Text style={globalStyles.cardLabel}>
						Fiber:
						<Text style={globalStyles.cardLabelBold}>
							{" "}
							{foodItem.fiberPCT}%
						</Text>
					</Text>
					<Text style={globalStyles.cardLabel}>
						Moisture:{" "}
						<Text style={globalStyles.cardLabelBold}>
							{" "}
							{foodItem.moisturePCT}%
						</Text>
					</Text>
				</View>

				<Text style={globalStyles.cardLabel}>
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
		marginBottom: 20,
	},

	centered: {
		justifyContent: "center",
		alignItems: "flex-start",
		padding: 12,
		borderRadius: 14,
		backgroundColor: colors.cardBackground,
		marginBottom: 8,
	},

	row: {
		flexDirection: "row",
		flexWrap: "wrap",
		rowGap: 2,
		columnGap: 8,
	},

	lastUsed: {
		fontSize: 14,
		color: colors.textSecondary,
	},

	selected: {
		borderColor: colors.primary,
		borderWidth: 1,
	},

	notSelected: {
		borderWidth: 0,
	},
});
