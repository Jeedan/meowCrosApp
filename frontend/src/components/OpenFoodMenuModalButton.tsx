import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

// Todo:
// Rename to OpenAddModal
// Modal will display:
// Add a Meal Entry
// Add a new Food to Library
export default function OpenFoodMenuModalButton() {
	const openModal = () => {
		console.log("hello opened modal");

		// TODO: remove this and make it a modal toggel
		// TESTING ONBOARDING ONLY
		router.replace("/onboarding");
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.addButton} onPress={openModal}>
				<Ionicons name="add" size={32} color="white" />
			</TouchableOpacity>
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
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: colors.primary,
	},
});
