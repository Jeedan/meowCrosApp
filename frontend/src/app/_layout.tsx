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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();

// Create a client for tanstack query
// keep outside of component in case of accidental recreation of the client
// causing to rerenders
// this way the same client survives re-renders
const queryClient = new QueryClient();

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

	// TODO: remove/comment out SQLite after setting up tanstack
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

		console.log("ENV TEST: ", process.env.EXPO_PUBLIC_BASE_URL);
	}, [success, error]);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<FontProvider onFontReady={handleFontReady}>
				<ThemeProvider value={navigationTheme}>
					<KeyboardProvider>
						<QueryClientProvider client={queryClient}>
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
						</QueryClientProvider>
					</KeyboardProvider>
				</ThemeProvider>
			</FontProvider>
		</GestureHandlerRootView>
	);
}
