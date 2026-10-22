import { useFeedingLog } from "@/store/store";
import { colors, icons, radius, spacing, typography } from "@/styles/global";
import { PlateItem } from "@shared/types/meal";
import { StyleSheet, Text, View } from "react-native";
import ReanimatedSwipeable, {
	SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";

import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import SwipeAction from "../gestures/SwipeAction";
import { Ionicons } from "@expo/vector-icons";

type DashboardPlateItemProps = {
	meal: PlateItem;
	feedingLogId: string;
};

export default function DashboardPlateItem({
	meal,
	feedingLogId,
}: DashboardPlateItemProps) {
	const removePlateItem = useFeedingLog((state) => state.removePlateItem);

	const handlerDelete = (swipeable: SwipeableMethods) => {
		swipeable.close();
		// removes an entire feeding log
		console.log("delete feeding: ", meal.id);
		removePlateItem(feedingLogId, meal.id);
	};

	return (
		<View style={styles.swipeable}>
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
										size={icons.md}
										color={colors.text}
									></Ionicons>
								</ConfirmDeleteModal>
							);
						}}
					/>
				)}
			>
				<View style={styles.mealsContainer}>
					<Text style={styles.mealsHeader}>
						{meal.foodNameSnapshot}
					</Text>
					<Text style={styles.mealText}>
						{meal.gramsServed}g • {meal.kcalCalculated}kcal
					</Text>
				</View>
			</ReanimatedSwipeable>
		</View>
	);
}

const styles = StyleSheet.create({
	swipeable: {
		width: 300,
	},

	mealsContainer: {
		width: 300,
		height: 72,
		justifyContent: "center",
		borderColor: colors.textSecondary,
		backgroundColor: colors.cardBackground,
		borderRadius: radius.xl,
		borderWidth: 0,
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.lg,
		marginBottom: spacing.sm,
	},

	mealsHeader: {
		fontSize: typography.body,
		fontWeight: "600",
		color: colors.text,
		marginBottom: spacing.xs,
	},

	mealText: {
		fontSize: typography.caption,
		fontWeight: "600",
		color: colors.textSecondary,
		marginBottom: spacing.xs,
	},
	deleteButton: {
		backgroundColor: colors.alert,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.md,
		borderRadius: radius.xl,
	},
});
