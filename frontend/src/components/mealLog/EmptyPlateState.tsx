import { colors, icons } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import Button from "../Button";

type EmptyPlateStateProps = {
	onPress: () => void;
};

export default function EmptyPlateState({ onPress }: EmptyPlateStateProps) {
	return (
		<>
			<View style={[styles.emptyPlate, styles.row]}>
				<View>
					<Ionicons
						name="alert-circle"
						size={icons.sizeS}
						color={colors.text}
					></Ionicons>
				</View>

				<View style={styles.halfWidth}>
					<Text style={[styles.emptyPlateText]}>
						Your Plate is empty, Add Food using the food picker.
					</Text>
				</View>

				<View>
					<Button onPress={onPress} style={styles.pickButton}>
						<Text style={styles.textColor}>Pick Food</Text>
					</Button>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 10,
	},

	halfWidth: {
		flex: 1,
		marginHorizontal: 10,
	},

	emptyPlate: {
		height: 100,
		borderRadius: 15,
		backgroundColor: colors.secondary,
	},

	emptyPlateText: {
		fontSize: 16,
		color: colors.text,
		textAlign: "left",
	},

	pickButton: {
		borderRadius: 30,
		marginTop: 0,
		backgroundColor: "rgba(0, 119, 255, 1)",
	},

	textColor: {
		color: colors.text,
	},
});
