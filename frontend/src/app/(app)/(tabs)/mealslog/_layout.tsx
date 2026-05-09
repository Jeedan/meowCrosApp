import { Stack } from "expo-router";

export default function MealsLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{ title: "Meals", headerShown: true }}
			/>
			<Stack.Screen
				name="addmeal"
				options={{ title: "Add Meal", headerShown: true }}
			/>
			<Stack.Screen
				name="history"
				options={{ title: "History", headerShown: true }}
			/>
		</Stack>
	);
}
