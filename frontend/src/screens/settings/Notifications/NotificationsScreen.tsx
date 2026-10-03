import React from "react";
import { Text, View } from "react-native";

function NotificationsScreen() {
	return (
		<>
			<View>Notification Reminders</View>
			<View>
				<Text>Start time</Text>
			</View>
			<View>
				<Text>End Time</Text>
			</View>
			<View>
				<Text>Interval</Text>
			</View>

			{/* TODO: edit button */}
			<View>
				<Text>Edit Button</Text>
			</View>
		</>
	);
}

export default NotificationsScreen;
