import { Inter_400Regular } from "@expo-google-fonts/inter";
import { useFont } from "@shopify/react-native-skia";
import React, { createContext, useContext, useEffect } from "react";

const FontContext = createContext<ReturnType<typeof useFont> | null>(null);

type FontProviderProps = {
	children: React.ReactNode;
	onFontReady: () => void;
};
// TODO replace inter with the font we want for the app itself
// also replace 12 with a constant for font size
export function FontProvider({ children, onFontReady }: FontProviderProps) {
	const font = useFont(Inter_400Regular, 12);

	useEffect(() => {
		if (font) {
			console.log("Skia font loaded");
			onFontReady();
		}
	}, [font, onFontReady]);
	if (!font) return null;

	return <FontContext.Provider value={font}>{children}</FontContext.Provider>;
}

export function useAppFont() {
	return useContext(FontContext);
}
