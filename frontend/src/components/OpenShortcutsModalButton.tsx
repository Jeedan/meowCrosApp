import { colors, icons, radius, spacing } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import ShortcutsModal from "./modals/ShortcutsModal";

// Modal will display:
// Add a Meal Entry
// Add a new Food to Library
export default function OpenShortcutsModalButton() {
	return (
		<View style={styles.container}>
			<ShortcutsModal
				buttonStyle={styles.addButton}
				modalText="Shortcuts"
			>
				<Ionicons name="add" size={icons.lg} color={colors.text} />
			</ShortcutsModal>
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
