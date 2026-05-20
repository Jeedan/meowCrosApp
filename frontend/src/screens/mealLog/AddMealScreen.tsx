import { colors, globalStyles } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

export default function AddMealScreen() {
	return (
		<View style={globalStyles.container}>
			<Text style={styles.textColor}>Add a Meals entry </Text>
		</View>
	);
}

const styles = StyleSheet.create({
	textColor: {
		color: colors.text,
	},
});
