import { StyleSheet } from "react-native";

// also a cool color #192734
export const colors = {
	background: "#121212",
	cardBackground: "#212121",
	darkOverlay: "rgba(0,0,0,0.5)",
	hidden: "rgba(0,0,0,0)",
	primary: "#00caafff",
	secondary: "#3cc8ebff",
	text: "#ffffff",
	textSecondary: "#a0a0b0",
	disabled: "#79797985",
	alert: "#ff5252",
	warning: "#ffc400ff",
	dismiss: "#555",
	cardForeGround: "#414141",
} as const;

export const dotSeparator = "•" as const;

export const icons = {
	sm: 16,
	md: 22,
	lg: 26,
	xl: 32,
} as const;

export const spacing = {
	none: 0,
	xxs: 2,
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 20,
	xxl: 24,
	xxxl: 32,
	huge: 40,
} as const;

export const typography = {
	caption: 12,
	label: 14,
	body: 16,
	bodyLarge: 18,
	title: 22,
	titleLarge: 26,
	display: 36,
} as const;

export const controlSize = {
	minTouchTarget: 48,
	inputHeight: 48,
	buttonHeight: 48,
} as const;

export const radius = {
	sm: 4,
	md: 8,
	lg: 12,
	xl: 16,
	xxl: 20,
	pill: 999,
} as const;

export const globalStyles = StyleSheet.create({
	testingBorder: {
		borderColor: colors.alert,
		borderWidth: 1,
	},

	scrollContainer: {
		flex: 1,
		backgroundColor: colors.background,
	},

	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.cardBackground,
	},

	scrollContent: {
		flexGrow: 1,
		backgroundColor: colors.background,
		paddingTop: spacing.xl,
		paddingHorizontal: spacing.xl,
		paddingBottom: spacing.huge,
	},

	title: {
		fontSize: typography.display,
		fontWeight: "bold",
		color: colors.text,
	},

	sectionTitle: {
		fontSize: typography.bodyLarge,
		fontWeight: "600",
		color: colors.textSecondary,
		marginBottom: spacing.md,
	},

	empty: {
		color: colors.textSecondary,
		fontSize: typography.label,
	},

	header: {
		justifyContent: "flex-start",
		alignItems: "flex-start",
		width: "100%",
		marginBottom: spacing.xl,
	},

	buttonText: {
		color: colors.text,
		fontSize: typography.bodyLarge,
	},

	cardHeader: {
		fontSize: typography.bodyLarge,
		fontWeight: "600",
		color: colors.text,
		marginBottom: spacing.md,
	},

	cardTitle: {
		fontSize: typography.bodyLarge,
		color: colors.text,
		marginBottom: spacing.xxs,
	},

	cardLabelBold: {
		color: colors.text,
		fontWeight: "300",
	},
});
