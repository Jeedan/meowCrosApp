import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

// TODO TURN INTO MODAL IF POSSIBLE
export default function AddMenuScreen() {
	return (
		<View style={globalStyles.container}>
			<Text style={styles.title}>
				Add a Meal entry or add a new Food to the library{" "}
			</Text>
			<Link href="/mealslog/addmeal">Add new Meal Entry</Link>
			<Link href="/foodlibrary">Add new Food</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "600",
	},
});
