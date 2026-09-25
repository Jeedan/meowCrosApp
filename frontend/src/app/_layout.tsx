import { colors } from "@/styles/global";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Inter_400Regular } from "@expo-google-fonts/inter";

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
	});

	if (!fontsLoaded) {
		return null;
	}

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
