import { colors, globalStyles } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

export default function AddFoodScreen() {
	return (
		<View style={globalStyles.container}>
			<Text style={styles.textColor}>Add a Food to the Food Library</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	textColor: {
		color: colors.text,
	},
});
