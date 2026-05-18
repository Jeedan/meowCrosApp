import { colors, globalStyles } from "@/styles/global";
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
					<Text style={globalStyles.cardLabel}>Nutrition:</Text>
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
