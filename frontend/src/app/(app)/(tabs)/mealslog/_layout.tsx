import { colors } from "@/styles/global";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function MealsLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Meals",
					headerShown: true,
					headerTitleAlign: "center",
					headerTitleStyle: styles.titleStyle,
					headerStyle: styles.headerStyle,
				}}
			/>
			<Stack.Screen
				name="addmeal"
				options={{
					title: "Add Meal",
					headerShown: true,
					headerTitleAlign: "center",
					headerTitleStyle: styles.titleStyle,
					headerStyle: styles.headerStyle,
					headerTintColor: colors.text,
				}}
			/>
			<Stack.Screen
				name="history"
				options={{ title: "History", headerShown: true }}
			/>
		</Stack>
	);
}

const styles = StyleSheet.create({
	titleStyle: {
		color: colors.text,
		fontSize: 28,
	},
	headerStyle: {
		backgroundColor: colors.cardBackground,
	},
});
