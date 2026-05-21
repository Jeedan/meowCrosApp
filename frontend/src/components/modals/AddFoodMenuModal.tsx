import { colors } from "@/styles/global";
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

type AddFoodMenuModalProps = {
	onConfirm?: () => void;
	onDismiss?: () => void;
	modalText: string;
	children: ReactNode;
	buttonStyle?: StyleProp<ViewStyle>;
};

export default function AddFoodMenuModal({
	onConfirm,
	onDismiss,
	modalText,
	children,
	buttonStyle: style,
}: AddFoodMenuModalProps) {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				allowSwipeDismissal={true}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<OutsideDismissButton
						onPress={() => {
							onDismiss?.();
							setModalVisible(!modalVisible);
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
										onDismiss?.();
										setModalVisible(!modalVisible);
									}}
								>
									<Ionicons
										name="close-outline"
										size={24}
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
						{/* divider */}
						<View style={styles.divider}></View>

						{/* Links */}
						{/* [Icon] [Label]-- space -- [arrow icon] */}

						<AddMealMenuRow
							iconName="library-outline"
							labelText="Add a Meal Entry"
							onPress={() => {
								setModalVisible(!modalVisible);
								router.push("/addmeal");

								//router.navigate("/mealslog");
								// setTimeout(() => {
								// 	router.push("/addmeal");
								// }, 25);
							}}
						/>
						{/* divider */}
						<View style={styles.divider}></View>
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
		paddingVertical: 50,
	},

	modalView: {
		width: "100%",
		height: "60%",
		backgroundColor: colors.cardBackground,
		borderRadius: 20,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},

	rowContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},

	titleContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	linksContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		height: 40,
		marginTop: 20,
	},

	modalTitle: {
		fontSize: 24,
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
		marginTop: 0,
	},

	cancelButton: {
		backgroundColor: colors.hidden,
	},
	labelContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
	},

	labelStyle: {
		fontSize: 16,
		color: colors.text,
		fontWeight: "600",
		textAlign: "left",
	},

	divider: {
		marginTop: 4,
		marginBottom: 12,
		height: 2,
		backgroundColor: colors.dismiss,
	},
});
