import { globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function SettingsScreen() {
	return (
		<View style={globalStyles.container}>
			<Link href="/onboarding">
				<Text style={globalStyles.sectionTitle}>Onboarding</Text>
			</Link>
		</View>
	);
}
