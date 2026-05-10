import { colors } from "@/styles/global";
import { Stack } from "expo-router";

export default function MealsLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Meals",
					headerShown: true,
					headerTitleAlign: "center",
					headerTitleStyle: {
						color: colors.text,
						fontSize: 28,
					},
					headerStyle: { backgroundColor: colors.background },
				}}
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
