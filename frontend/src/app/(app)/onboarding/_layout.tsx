import { colors } from "@/styles/global";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
		</Stack>
	);
}

const styles = StyleSheet.create({
	titleStyle: {
		color: colors.text,
		fontSize: 28,
	},
	headerStyle: {
		backgroundColor: colors.cardBackground,
	},
});
