import { colors } from "@/styles/global";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
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

				<Stack.Screen name="(app)" options={{ headerShown: false }} />
			</Stack>
		</GestureHandlerRootView>
	);
}
