import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Meal } from "@shared/types/meal";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ReanimatedSwipeable, {
	SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
	Extrapolation,
	interpolate,
	SharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";

type DashboardMealItemProps = {
	meal: Meal;
	onDelete: (mealId: string) => void;
};

type RightActionProps = {
	prog: SharedValue<number>;
	onDelete: () => void;
};

// action for swipeable
function RightAction({ prog, onDelete }: RightActionProps) {
	const styleAnimation = useAnimatedStyle(() => {
		return {
			opacity: interpolate(
				prog.value,
				[0, 1],
				[0, 1],
				Extrapolation.CLAMP,
			),
			transform: [
				{
					scale: interpolate(
						prog.value,
						[0, 1],
						[0.8, 1],
						Extrapolation.CLAMP,
					),
				},
			],
		};
	});
	return (
		<Reanimated.View style={[styles.deleteContainer, styleAnimation]}>
			<Pressable style={styles.deleteButton} onPress={onDelete}>
				<Ionicons
					name="trash-outline"
					size={22}
					color={colors.text}
				></Ionicons>
			</Pressable>
		</Reanimated.View>
	);
}

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
				<RightAction
					prog={progress}
					onDelete={() => {
						handlerDelete(swipeable);
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
		borderRadius: 15,
		borderWidth: 1,
		padding: 6,
		marginBottom: 8,
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

	deleteContainer: {
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 12,
	},

	deleteButton: {
		justifyContent: "center",
		alignItems: "center",
		borderColor: colors.alert,
		borderWidth: 1,
		borderRadius: 14,
		width: 50,
		height: 50,
	},
	deleteText: {
		color: colors.text,
		fontSize: 16,
	},
});
