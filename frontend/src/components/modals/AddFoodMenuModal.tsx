import { colors, globalStyles } from "@/styles/global";
import React, { ReactNode, useState } from "react";
import Button from "@/components/Button";
import {
	Modal,
	StyleSheet,
	Text,
	View,
	StyleProp,
	ViewStyle,
	Pressable,
} from "react-native";

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
					<View style={styles.outsideOfModalContainer}>
						<Pressable
							style={styles.outofBoundsButton}
							onPress={() => {
								onDismiss?.();
								setModalVisible(!modalVisible);
							}}
						></Pressable>
					</View>

					<View style={styles.modalView}>
						<Text style={styles.modalText}>{modalText}</Text>
						<View style={styles.actions}>
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
								<Text style={styles.textStyle}>Cancel</Text>
							</Button>
							<Button
								style={[
									styles.actionButton,
									styles.confirmButton,
								]}
								onPress={() => {
									onConfirm?.();
									setModalVisible(false);
								}}
							>
								<Text style={styles.textStyle}>Delete</Text>
							</Button>
						</View>
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
		//	backgroundColor: colors.darkOverlay,
	},

	modalView: {
		width: "100%",
		height: "50%",
		backgroundColor: colors.cardBackground,
		borderRadius: 20,
		padding: 35,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},

	modalText: {
		marginBottom: 15,
		color: colors.text,
		textAlign: "center",
		fontSize: 16,
	},

	actions: {
		flexDirection: "row",
		gap: 12,
	},

	actionButton: {
		flex: 1,
		paddingVertical: 12,
		borderRadius: 12,
		marginTop: 12,
		alignItems: "center",
	},

	cancelButton: {
		backgroundColor: colors.dismiss,
	},

	confirmButton: {
		backgroundColor: colors.alert,
	},

	textStyle: {
		color: colors.text,
		fontWeight: "600",
	},

	outsideOfModalContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: "90%",
		height: "48%",
		marginBottom: 10,
		marginTop: 10,
	},
	outofBoundsButton: {
		flex: 1,
		width: "100%",
		marginBottom: 10,
		marginTop: 10,
	},
});
