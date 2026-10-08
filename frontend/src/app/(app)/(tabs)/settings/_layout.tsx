import { colors } from "@/styles/global";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function SettingsLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					title: "Settings",
					headerShown: true,
					headerTitleAlign: "left",
					headerTitleStyle: styles.titleStyle,
					headerStyle: styles.headerStyle,
				}}
			/>
			<Stack.Screen
				name="account"
				options={{
					title: "Account info",
					headerShown: true,
					headerTitleStyle: styles.titleStyle,
					headerStyle: styles.headerStyle,
					headerTintColor: colors.text,
					headerTitleAlign: "center",
				}}
			/>
			<Stack.Screen
				name="catProfile"
				options={{
					title: "Cat Profile",
					headerShown: true,
					headerTitleStyle: styles.titleStyle,
					headerStyle: styles.headerStyle,
					headerTintColor: colors.text,
					headerTitleAlign: "center",
				}}
			/>
			<Stack.Screen
				name="notifications"
				options={{
					title: "Notifications",
					headerShown: true,
					headerTitleStyle: styles.titleStyle,
					headerStyle: styles.headerStyle,
					headerTintColor: colors.text,
					headerTitleAlign: "center",
				}}
			/>
		</Stack>
	);
}

const styles = StyleSheet.create({
	titleStyle: {
		color: colors.text,
		fontSize: 20,
	},
	headerStyle: {
		backgroundColor: colors.cardBackground,
	},
});
