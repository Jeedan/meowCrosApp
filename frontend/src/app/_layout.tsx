import { FontProvider } from "@/context/FontContext";
import { initializeAppData } from "@/database/initializeAppData";
import { colors } from "@/styles/global";
import { SplashScreen, Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontReady, setFontReady] = useState(false);
	const [dataReady, setDataReady] = useState(false);

	const handleFontReady = useCallback(() => {
		setFontReady(true);
	}, []);

	useEffect(() => {
		if (fontReady && dataReady) {
			void SplashScreen.hide();
		}
	}, [fontReady, dataReady]);

	// Local SQLite database initialization
	useEffect(() => {
		initializeAppData()
			.then(() => setDataReady(true))
			.catch((error) => {
				// TODO: add error Screen if database won't load, maybe a retry
				console.error("[SQLite Data initialization failed", error);
			});
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
