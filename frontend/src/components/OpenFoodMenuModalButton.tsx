import { colors, icons, radius, spacing } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import AddFoodMenuModal from "./modals/AddFoodMenuModal";

// Modal will display:
// Add a Meal Entry
// Add a new Food to Library

// TODO: Quick Add Previous Meal
export default function OpenFoodMenuModalButton() {
	return (
		<View style={styles.container}>
			<AddFoodMenuModal
				buttonStyle={styles.addButton}
				modalText="Shortcuts"
			>
				<Ionicons name="add" size={icons.lg} color={colors.text} />
			</AddFoodMenuModal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		overflow: "visible",
		backgroundColor: colors.cardBackground,
	},

	addButton: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.sm,
		borderRadius: radius.pill,
		backgroundColor: colors.primary,
		marginTop: spacing.none,
	},
});
