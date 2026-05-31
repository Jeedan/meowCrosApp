import Button from "@/components/Button";
import { colors, globalStyles } from "@/styles/global";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function MealsLogScreen() {
	const onPressHandler = () => {
		console.log("navigating to addMeal screen");
		router.push("/addmeal");
	};

	return (
		<View style={globalStyles.container}>
			<Text style={styles.textColor}>
				Empty Meals Log, add a meal entry!
			</Text>
			<View>
				<Button onPress={onPressHandler} style={styles.pickButton}>
					<Text style={styles.textColor}>Add Meal</Text>
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	pickButton: {
		borderRadius: 30,
	},

	confirmButton: {
		borderRadius: 15,
		alignItems: "flex-end",
	},

	textColor: {
		color: colors.text,
	},
});
