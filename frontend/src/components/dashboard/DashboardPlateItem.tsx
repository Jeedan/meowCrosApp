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
	enableSwipe?: boolean;
};

function PlateContent({ meal }: { meal: PlateItem }) {
	return (
		<View style={styles.mealsContainer}>
			<Text style={styles.mealsHeader}>{meal.foodNameSnapshot}</Text>
			<Text style={styles.mealText}>
				{meal.gramsServed}g • {meal.kcalCalculated}kcal
			</Text>
		</View>
	);
}

export default function DashboardPlateItem({
	meal,
	feedingLogId,
	enableSwipe = true,
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
			{enableSwipe ? (
				<ReanimatedSwipeable
					friction={2}
					enableTrackpadTwoFingerGesture
					rightThreshold={50}
					renderRightActions={(progress, drag, swipeable) => (
						<SwipeAction
							prog={progress}
							renderContent={() => (
								<ConfirmDeleteModal
									onConfirm={() => handlerDelete(swipeable)}
									modalText="Do you want to delete the entry?"
									style={styles.deleteButton}
								>
									<Ionicons
										name="trash-outline"
										size={icons.md}
										color={colors.text}
									/>
								</ConfirmDeleteModal>
							)}
						/>
					)}
				>
					<PlateContent meal={meal} />
				</ReanimatedSwipeable>
			) : (
				<PlateContent meal={meal} />
			)}
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
		backgroundColor: colors.cardBackground,
		borderColor: colors.textSecondary,
		borderRadius: radius.xl,
		borderWidth: 0,
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.lg,
		marginBottom: spacing.xs,
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
