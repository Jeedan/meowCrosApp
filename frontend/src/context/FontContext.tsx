import { Inter_400Regular } from "@expo-google-fonts/inter";
import { useFont } from "@shopify/react-native-skia";
import { createContext, useContext } from "react";

const FontContext = createContext<ReturnType<typeof useFont> | null>(null);

// TODO replace inter with the font we want for the app itself
// also replace 12 with a constant for font size
export function FontProvider({ children }: { children: React.ReactNode }) {
	const font = useFont(Inter_400Regular, 12);

	if (!font) return null;

	return <FontContext.Provider value={font}>{children}</FontContext.Provider>;
}

export function useAppFont() {
	return useContext(FontContext);
}
