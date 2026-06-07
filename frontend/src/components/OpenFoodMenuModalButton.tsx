import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import AddFoodMenuModal from "./modals/AddFoodMenuModal";

// Modal will display:
// Add a Meal Entry
// Add a new Food to Library
export default function OpenFoodMenuModalButton() {
	return (
		<View style={styles.container}>
			<AddFoodMenuModal
				buttonStyle={styles.addButton}
				modalText="Add Food"
			>
				<Ionicons name="add" size={24} color={colors.text} />
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
		paddingVertical: 8,
		paddingHorizontal: 8,
		borderRadius: 14,
		backgroundColor: colors.primary,
		marginTop: 0,
	},
});
