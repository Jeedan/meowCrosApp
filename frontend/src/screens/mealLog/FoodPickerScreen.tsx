import { colors, globalStyles } from "@/styles/global";
import { StyleSheet, Text, View } from "react-native";

export default function FoodPickerScreen() {
	return (
		<View style={globalStyles.container}>
			<Text style={styles.textColor}>Pick a Food</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	textColor: {
		color: colors.text,
	},
});
