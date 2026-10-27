import { colors, icons, radius, spacing, typography } from "@/styles/global";
import React, { ReactNode, useState } from "react";
import Button from "@/components/Button";
import {
	Modal,
	StyleSheet,
	Text,
	View,
	StyleProp,
	ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OutsideDismissButton from "./OutsideDismissButton";
import AddMealMenuRow from "./AddMealMenuRow";
import { router } from "expo-router";
import { useFeedingLog } from "@/store/store";
import { daysAgo, isToday } from "@/utils/dateUtils";
import { FeedingLog, PlateItem } from "@shared/types/meal";
import { incrementId } from "@/data/dummyData";

type AddFoodMenuModalProps = {
	onDismiss?: () => void;
	modalText: string;
	children: ReactNode;
	buttonStyle?: StyleProp<ViewStyle>;
};

export default function AddFoodMenuModal({
	onDismiss,
	modalText,
	children,
	buttonStyle: style,
}: AddFoodMenuModalProps) {
	const [modalVisible, setModalVisible] = useState(false);

	const feedingLog = useFeedingLog((state) => state.feedingLog);
	const addMeal = useFeedingLog((state) => state.addMeal);
	const todaysFeeding = feedingLog.filter((l) => isToday(l.loggedAt));
	const lastMeal = todaysFeeding[todaysFeeding.length - 1];
	const lastFood: PlateItem[] = lastMeal?.plate ?? [];

	const noLastFood = lastFood.length === 0;

	const displayLastFoodName = lastFood
		.map((item) => item.foodNameSnapshot)
		.join(",\n");

	function closeModal() {
		setModalVisible(false);
		onDismiss?.();
	}

	// TODO: use backend data, remove dummy data
	function quickAddPreviousMeal(): boolean {
		if (noLastFood) return false;
		console.log("meals", JSON.stringify(displayLastFoodName, null, 2));
		// construct a feedinglog object
		const plate = lastFood;
		const log: FeedingLog = {
			id: incrementId(),
			userId: "13",
			loggedAt: daysAgo(0),
			plate: plate,
		};
		addMeal(log);
		return true;
	}

	return (
		<>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				allowSwipeDismissal={true}
				onRequestClose={closeModal}
			>
				<View style={styles.centeredView}>
					<OutsideDismissButton
						onPress={() => {
							closeModal();
						}}
					/>
					<View style={styles.modalView}>
						<View style={styles.rowContainer}>
							<View style={[styles.side]}>
								<Button
									style={[
										styles.actionButton,
										styles.cancelButton,
									]}
									onPress={() => {
										closeModal();
									}}
								>
									<Ionicons
										name="close-outline"
										size={icons.lg}
										color={colors.text}
									></Ionicons>
								</Button>
							</View>
							{/* Title */}
							<View style={styles.titleContainer}>
								<Text style={styles.modalTitle}>
									{modalText}
								</Text>
							</View>
							{/* Dummy button for layouting */}
							<View style={[styles.side]} />
						</View>
						{/* Links */}
						{/* [Icon] [Label]-- space -- [arrow icon] */}
						<AddMealMenuRow
							iconName="library-outline"
							labelText="Quick Log last Meal"
							subLabelText={displayLastFoodName}
							onPress={() => {
								// TODO: use new setTimestamp helper for meals logging
								if (!quickAddPreviousMeal()) return;

								closeModal();
								router.navigate("/mealslog");
							}}
							disabled={noLastFood}
						/>
						<AddMealMenuRow
							iconName="library-outline"
							labelText="Log a new Meal"
							onPress={() => {
								closeModal();
								router.push("/addmeal");
							}}
						/>
						<AddMealMenuRow
							iconName="library-outline"
							labelText="Add new Food to Library"
							onPress={() => {
								closeModal();
								router.push("/addfood");
							}}
						/>
					</View>
				</View>
			</Modal>
			<Button style={style} onPress={() => setModalVisible(true)}>
				{children}
			</Button>
		</>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},

	modalView: {
		width: "100%",
		height: "60%",
		backgroundColor: colors.cardBackground,
		borderRadius: radius.xl,
		padding: spacing.xl,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: spacing.xs,
		elevation: spacing.xs,
	},

	rowContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: colors.cardForeGround,
	},

	titleContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	modalTitle: {
		fontSize: typography.titleLarge,
		fontWeight: "bold",
		color: colors.text,
		textAlign: "center",
	},

	side: {
		width: 52,
		justifyContent: "center",
		alignItems: "center",
	},

	actionButton: {
		marginTop: spacing.none,
	},

	cancelButton: {
		backgroundColor: colors.hidden,
	},
});
