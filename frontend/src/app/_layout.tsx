import { colors } from "@/styles/global";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerShown: false,
					contentStyle: {
						backgroundColor: colors.background,
					},
				}}
			/>
			<Stack.Screen
				name="(app)/(tabs)"
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="(app)/onboarding/index"
				options={{ headerShown: false }}
			/>
		</Stack>
	);
}
