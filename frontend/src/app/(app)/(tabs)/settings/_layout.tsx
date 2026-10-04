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
					headerShown: false,
					headerTitleStyle: styles.titleStyle,
					headerStyle: styles.headerStyle,
					headerTintColor: colors.text,
				}}
			/>{" "}
			<Stack.Screen
				name="catProfile"
				options={{
					title: "Cat Profile",
					headerShown: false,
					headerTitleStyle: styles.titleStyle,
					headerStyle: styles.headerStyle,
					headerTintColor: colors.text,
				}}
			/>
			<Stack.Screen
				name="notifications"
				options={{
					title: "Notification Reminders",
					headerShown: false,
					headerTitleStyle: styles.titleStyle,
					headerStyle: styles.headerStyle,
					headerTintColor: colors.text,
				}}
			/>
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
