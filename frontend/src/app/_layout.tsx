import { FontProvider } from "@/context/FontContext";
import { initializeDatabase } from "@/database/database";
import { seedFoods } from "@/database/foodQueries";
import { useFoodLibrary } from "@/store/store";
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
	}, [fontReady]);

	// TEMP DB TEST
	useEffect(() => {
		initializeDatabase()
			.then(() => seedFoods())
			.then(() => useFoodLibrary.getState().loadFoods())
			.then(() => console.log("[SQLite] Food initialization complete"))
			.catch((error) => {
				console.error("[SQLite food initialization failed", error);
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
