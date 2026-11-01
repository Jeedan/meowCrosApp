import { DarkTheme } from "@react-navigation/native";
import { colors } from "./global";

export const navigationTheme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		background: colors.background,
		card: colors.cardBackground,
		text: colors.text,
		border: colors.border,
		primary: colors.primary,
		notification: colors.secondary,
	},
};
