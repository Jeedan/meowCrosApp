import { FontProvider } from "@/context/FontContext";
import { initializeAppData } from "@/database/initializeAppData";
import { colors } from "@/styles/global";
import { navigationTheme } from "@/styles/navigationTheme";
import { ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../../drizzle/migrations";
import { db } from "@/database/database";
import { KeyboardProvider } from "react-native-keyboard-controller";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontReady, setFontReady] = useState(false);
	const [dataReady, setDataReady] = useState(false);
	const { success, error } = useMigrations(db, migrations);

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
		if (error) {
			console.error("[Drizzle Migration Failed]", error);
			return;
		}

		if (!success) return;

		initializeAppData()
			.then(() => setDataReady(true))
			.catch((error) => {
				// TODO: add error Screen if database won't load, maybe a retry
				console.error(
					"[Drizzle SQLite] Data initialization failed",
					error,
				);
			});
	}, [success, error]);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<FontProvider onFontReady={handleFontReady}>
				<ThemeProvider value={navigationTheme}>
					<KeyboardProvider>
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
								options={{
									headerShown: false,
									contentStyle: {
										backgroundColor: colors.background,
									},
								}}
							/>
						</Stack>
					</KeyboardProvider>
				</ThemeProvider>
			</FontProvider>
		</GestureHandlerRootView>
	);
}
