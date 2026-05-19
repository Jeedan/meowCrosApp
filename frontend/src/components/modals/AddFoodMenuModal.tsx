import { globalStyles } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

export default function AddFoodMenuModal() {
	return (
		<View style={styles.container}>
			<View style={styles.container}>
				<Text style={globalStyles.cardHeader}>Add Food to Library</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
