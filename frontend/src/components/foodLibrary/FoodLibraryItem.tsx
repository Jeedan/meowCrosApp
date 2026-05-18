import { colors } from "@/styles/global";
import { FoodItem } from "@shared/types/meal";
import { StyleSheet, Text, View } from "react-native";
import ReanimatedSwipeable, {
	SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import SwipeAction from "../gestures/SwipeAction";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import { Ionicons } from "@expo/vector-icons";
type FoodLibraryItemProps = {
	foodItem: FoodItem;
	onDelete: (id: string) => void;
};

export default function FoodLibraryItem({
	foodItem,
	onDelete,
}: FoodLibraryItemProps) {
	const handlerDelete = (swipeable: SwipeableMethods) => {
		swipeable.close();
		onDelete(foodItem.id);
	};

	return (
		<ReanimatedSwipeable
			friction={2}
			enableTrackpadTwoFingerGesture
			rightThreshold={50}
			renderRightActions={(progress, drag, swipeable) => (
				<SwipeAction
					prog={progress}
					renderContent={() => {
						return (
							<ConfirmDeleteModal
								onConfirm={() => handlerDelete(swipeable)}
								modalText="Do you want to delete the entry?"
								style={styles.deleteButton}
							>
								<Ionicons
									name="trash-outline"
									size={22}
									color={colors.text}
								></Ionicons>
							</ConfirmDeleteModal>
						);
					}}
				/>
			)}
		>
			<View style={styles.centered} key={foodItem.id}>
				<Text style={styles.cardHeader}>{foodItem.name}</Text>
				<View style={styles.row}>
					<Text style={styles.label}>Brand: {foodItem.brand}</Text>
					<Text style={styles.label}>type: {foodItem.foodType}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>Nutrition:</Text>
					<Text style={styles.label}>
						Protein:
						<Text style={styles.labelNutrition}>
							{" "}
							{foodItem.proteinPCT}%
						</Text>
					</Text>
					<Text style={styles.label}>
						Fat:
						<Text style={styles.labelNutrition}>
							{" "}
							{foodItem.fatPCT}%
						</Text>
					</Text>
					<Text style={styles.label}>
						Fiber:
						<Text style={styles.labelNutrition}>
							{" "}
							{foodItem.fiberPCT}%
						</Text>
					</Text>
					<Text style={styles.label}>
						Moisture:{" "}
						<Text style={styles.labelNutrition}>
							{" "}
							{foodItem.moisturePCT}%
						</Text>
					</Text>
				</View>

				<Text style={styles.label}>
					Serving size:{" "}
					<Text style={styles.labelNutrition}>
						{" "}
						{foodItem.servingSizeG}g
					</Text>
				</Text>
				<Text style={styles.lastUsed}>
					last used: {foodItem.lastUsedAt.toDateString()}
				</Text>
			</View>
		</ReanimatedSwipeable>
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

	cardHeader: {
		fontSize: 18,
		fontWeight: "600",
		color: colors.text,
		marginBottom: 10,
	},

	label: {
		fontSize: 16,
		color: colors.textSecondary,
		marginBottom: 6,
	},
	labelNutrition: {
		color: colors.text,
		fontWeight: "300",
	},
	lastUsed: {
		fontSize: 12,
		color: colors.textSecondary,
	},

	deleteContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 12,
		gap: 8,
	},

	deleteButton: {
		backgroundColor: colors.alert,
		marginTop: 0,
		paddingVertical: 12,
		paddingHorizontal: 12,
		borderRadius: 14,
	},
});
