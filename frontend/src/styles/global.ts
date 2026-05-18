import { StyleSheet } from "react-native";

// also a cool color #192734
export const colors = {
	background: "#121212",
	cardBackground: "#212121",
	darkOverlay: "rgba(0,0,0,0.5)",
	primary: "#00caafff",
	secondary: "#3cc8ebff",
	text: "#ffffff",
	textSecondary: "#a0a0b0",
	disabled: "#79797985",
	alert: "#ff5252",
	warning: "#ffc400ff",
	dismiss: "#555",
};

export const globalStyles = StyleSheet.create({
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
		paddingTop: 20,
		paddingHorizontal: 20,
		paddingBottom: 40,
	},

	title: {
		fontSize: 36,
		fontWeight: "bold",
		color: colors.text,
	},

	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: colors.textSecondary,
		marginBottom: 12,
	},

	empty: {
		color: colors.textSecondary,
		fontSize: 14,
	},

	header: {
		justifyContent: "flex-start",
		alignItems: "flex-start",
		width: "100%",
		marginBottom: 20,
	},

	buttonText: {
		color: colors.text,
		fontSize: 18,
	},

	testingBorder: {
		borderStyle: "solid",
		borderColor: "#ff0000ff",
		borderWidth: 2,
	},

	cardHeader: {
		fontSize: 18,
		fontWeight: "600",
		color: colors.text,
		marginBottom: 10,
	},

	cardLabel: {
		fontSize: 16,
		color: colors.textSecondary,
		marginBottom: 6,
	},

	cardLabelBold: {
		color: colors.text,
		fontWeight: "300",
	},
});
