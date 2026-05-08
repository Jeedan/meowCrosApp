import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack screenOptions={{ headerShown: true }}>
			<Stack.Screen
				name="(app)/dashboard/index"
				options={{ headerShown: false }}
			/>
		</Stack>
	);
}
