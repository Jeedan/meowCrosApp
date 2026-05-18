import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Meal } from "@shared/types/meal";
import { StyleSheet, Text, View } from "react-native";
import ReanimatedSwipeable, {
	SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import SwipeAction from "../gestures/SwipeAction";

type DashboardMealItemProps = {
	meal: Meal;
	onDelete: (mealId: string) => void;
};

export default function DashboardMealItem({
	meal,
	onDelete,
}: DashboardMealItemProps) {
	const handlerDelete = (swipeable: SwipeableMethods) => {
		swipeable.close();
		onDelete(meal.id);
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
			<View style={styles.mealsContainer}>
				<Text style={styles.mealsHeader}>{meal.foodNameSnapshot}</Text>
				<Text style={styles.mealText}>
					Serving size: {meal.gramsServed}g
				</Text>
				<Text style={styles.mealText}>
					Total calories: {meal.kcalCalculated}
				</Text>
				<Text style={styles.mealText}>
					Fed at: {meal.loggedAt.toLocaleTimeString()}
				</Text>
			</View>
		</ReanimatedSwipeable>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "flex-start",
	},

	mealsContainer: {
		borderColor: colors.textSecondary,
		backgroundColor: colors.cardBackground,
		borderRadius: 15,
		borderWidth: 0,
		padding: 12,
		marginBottom: 8,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.55,
		shadowRadius: 15,
		elevation: 3,
	},

	mealsHeader: {
		fontSize: 16,
		fontWeight: "300",
		color: colors.text,
		marginBottom: 4,
	},

	mealText: {
		fontSize: 14,
		fontWeight: "600",
		color: colors.textSecondary,
		marginBottom: 4,
	},

	calorieText: {
		color: colors.text,
	},

	// incase we want to expand the swipe menu
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
