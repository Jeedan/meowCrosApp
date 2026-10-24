import {
	colors,
	dotSeparator,
	icons,
	radius,
	spacing,
	typography,
} from "@/styles/global";
import { FoodItem } from "@shared/types/meal";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SharedSwipeRow from "../gestures/SharedSwipeRow";

type FoodLibraryItemProps = {
	foodItem: FoodItem;
	onRequestDelete: (foodId: string) => void;
};

export default function FoodLibraryItem({
	foodItem,
	onRequestDelete,
}: FoodLibraryItemProps) {
	// const handlerDelete = (swipeable: SwipeableMethods) => {
	// 	swipeable.close();
	// 	onDelete(foodItem.id);
	// };

	const lastUsed = foodItem.lastUsedAt.toDateString();
	return (
		// <ReanimatedSwipeable
		// 	friction={2}
		// 	enableTrackpadTwoFingerGesture
		// 	rightThreshold={50}
		// 	renderRightActions={(progress, drag, swipeable) => (
		// 		<SwipeAction
		// 			prog={progress}
		// 			renderContent={() => {
		// 				return (
		// 					<ConfirmDeleteModal
		// 						onConfirm={() => handlerDelete(swipeable)}
		// 						modalText="Do you want to delete the entry?"
		// 						style={styles.deleteButton}
		// 					>
		// 						<Ionicons
		// 							name="trash-outline"
		// 							size={icons.md}
		// 							color={colors.text}
		// 						></Ionicons>
		// 					</ConfirmDeleteModal>
		// 				);
		// 			}}
		// 		/>
		// 	)}
		// >
		<SharedSwipeRow onDeletePress={() => onRequestDelete(foodItem.id)}>
			<View style={styles.card}>
				{/* Row: Icon - Name + subtitle for brand - Chevron icon for editing */}

				<View style={styles.header}>
					<View style={[styles.icon, styles.foodIcon]}>
						<Ionicons
							name="fish-outline"
							size={icons.md}
							color={colors.text}
						/>
					</View>
					<View style={styles.headerText}>
						<Text style={styles.foodName} numberOfLines={1}>
							{foodItem.name}
						</Text>
						<Text style={styles.subtitle} numberOfLines={1}>
							{foodItem.brand} {dotSeparator} {foodItem.foodType}{" "}
							food
						</Text>
					</View>

					<View style={styles.icon}>
						<Ionicons
							name="chevron-forward"
							size={icons.md}
							color={colors.cardForeGround}
						/>
					</View>
				</View>

				{/* Divider */}
				<View style={styles.divider} />

				{/* Nutrition Grid */}
				<View style={styles.nutritionGrid}>
					<View style={styles.nutritionCell}>
						<Text style={styles.nutritionLabel}>Protein</Text>
						<Text style={styles.nutritionValue}>
							{foodItem.proteinPCT}%
						</Text>
					</View>
					<View style={styles.nutritionCell}>
						<Text style={styles.nutritionLabel}>Fat</Text>
						<Text style={styles.nutritionValue}>
							{foodItem.fatPCT}%
						</Text>
					</View>

					<View style={styles.nutritionCell}>
						<Text style={styles.nutritionLabel}>Fiber</Text>
						<Text style={styles.nutritionValue}>
							{foodItem.fiberPCT}%
						</Text>
					</View>

					<View style={styles.nutritionCell}>
						<Text style={styles.nutritionLabel}>Moisture</Text>
						<Text style={styles.nutritionValue}>
							{foodItem.moisturePCT}%
						</Text>
					</View>
				</View>

				{/* Divider */}
				<View style={styles.divider} />
				{/* Serving and Last used */}
				<View style={styles.footer}>
					<Text style={styles.servingSize}>
						Serving size: {foodItem.servingSizeG}g
					</Text>
					<Text style={styles.lastUsed}>last used: {lastUsed}</Text>
				</View>
			</View>
		</SharedSwipeRow>
		// </ReanimatedSwipeable>
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

	row: {
		flexDirection: "row",
		gap: spacing.md,
		minHeight: 42,
	},

	icon: {
		width: 40,
		height: 40,
		borderRadius: radius.lg,
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
	},

	foodIcon: {
		backgroundColor: colors.cardForeGround,
	},

	card: {
		width: "100%",
		padding: spacing.lg,
		borderRadius: radius.lg,
		backgroundColor: colors.cardBackground,
		gap: spacing.sm,
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.md,
	},

	headerText: {
		flex: 1,
		minWidth: 0,
		flexShrink: 1,
	},

	foodName: {
		fontSize: typography.bodyLarge,
		fontWeight: "600",
		color: colors.text,
		flexShrink: 1,
	},

	subtitle: {
		fontSize: typography.label,
		color: colors.textSecondary,
		textTransform: "capitalize",
	},

	nutritionGrid: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 6,
	},

	nutritionCell: {
		flex: 1,
		gap: spacing.xs,
	},

	nutritionLabel: {
		fontSize: typography.caption,
		color: colors.textSecondary,
	},

	nutritionValue: {
		fontSize: typography.body,
		fontWeight: "600",
		color: colors.text,
	},

	footer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: spacing.sm,
	},

	servingSize: {
		fontSize: typography.caption,
		color: colors.text,
	},

	lastUsed: {
		fontSize: typography.caption,
		color: colors.textSecondary,
		textAlign: "right",
	},

	deleteContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: spacing.md,
		gap: spacing.sm,
	},

	deleteButton: {
		backgroundColor: colors.alert,
		marginTop: spacing.none,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.md,
		borderRadius: radius.xl,
	},

	divider: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: colors.cardForeGround,
		marginVertical: spacing.xs,
	},
});
