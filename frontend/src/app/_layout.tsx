import { FontProvider } from "@/context/FontContext";
import { colors } from "@/styles/global";
import { SplashScreen, Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontReady, setFontReady] = useState(false);

	const handleFontReady = useCallback(() => {
		setFontReady(true);
	}, []);

	useEffect(() => {
		if (fontReady) {
			void SplashScreen.hide();
		}
	}, []);
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<FontProvider onFontReady={handleFontReady}>
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
						name="(app)"
						options={{ headerShown: false }}
					/>
				</Stack>
			</FontProvider>
		</GestureHandlerRootView>
	);
}
