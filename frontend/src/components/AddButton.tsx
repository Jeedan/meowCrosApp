import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// Todo:
// Rename to OpenAddModal
// Modal will display:
// Add a Meal Entry
// Add a new Food to Library
export default function AddButton() {
	return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.addButton}>
				<Ionicons name="add" size={32} color="white" />
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		overflow: "visible",
		backgroundColor: colors.background,
	},

	addButton: {
		alignItems: "center",
		justifyContent: "center",
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: colors.primary,
	},
});
