import { StyleSheet } from "react-native";

// also a cool color #192734
export const colors = {
	background: "#212121",
	primary: "#00caafff",
	text: "#ffffff",
	textSecondary: "#a0a0b0",
	alert: "#ff5252",
};

export const globalStyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.background,
		paddingTop: 60,
		paddingHorizontal: 20,
	},

	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: colors.text,
	},

	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: colors.textSecondary,
	},

	empty: {
		color: colors.textSecondary,
		fontSize: 14,
	},

	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
