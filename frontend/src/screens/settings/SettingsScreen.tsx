import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { Text, View } from "react-native";

// TODO: setup sub screens in _layout.tsx app router
export default function SettingsScreen() {
	return (
		<View style={globalStyles.container}>
			{/* TODO: turn these into links, navigate to respective screen onclick */}
			<Text style={globalStyles.sectionTitle}>Account</Text>
			<Text style={globalStyles.sectionTitle}>Cat Profile</Text>
			<Text style={globalStyles.sectionTitle}>Notifications</Text>

			{/* TODO: Remove this later on, its only here to test */}
			<Link href="/onboarding">
				<Text style={globalStyles.sectionTitle}>Onboarding</Text>
			</Link>
		</View>
	);
}
