import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="(app)/(tabs)"
				options={{ headerShown: false }}
			/>
		</Stack>
	);
}
