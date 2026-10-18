import { colors, icons, radius, spacing, typography } from "@/styles/global";
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
						size={icons.md}
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
		paddingHorizontal: spacing.md,
	},

	halfWidth: {
		flex: 1,
		marginHorizontal: spacing.md,
	},

	emptyPlate: {
		height: 100,
		borderRadius: radius.xl,
		backgroundColor: colors.secondary,
	},

	emptyPlateText: {
		fontSize: typography.body,
		color: colors.text,
		textAlign: "left",
	},

	pickButton: {
		borderRadius: radius.xxl,
		marginTop: spacing.none,
		backgroundColor: "rgba(0, 119, 255, 1)",
	},

	textColor: {
		color: colors.text,
	},
});
