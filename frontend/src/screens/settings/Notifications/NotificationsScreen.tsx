import React from "react";
import { Text, View } from "react-native";

// TODO same UI as catprofile and account screen
// show read only versions then hit edit to change values
// save button
export default function NotificationsScreen() {
	return (
		<>
			<View>
				<Text>Notification Reminders</Text>
			</View>
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
