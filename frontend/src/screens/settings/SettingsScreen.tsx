import { colors, globalStyles } from "@/styles/global";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

// TODO: setup sub screens in _layout.tsx app router
export default function SettingsScreen() {
	return (
		<View style={styles.container}>
			{/* TODO: turn these into links, navigate to respective screen onclick */}

			<Text style={styles.title}>General</Text>
			<View style={styles.cardContainer}>
				<View>
					<Link href="/settings/account">
						<Text style={globalStyles.sectionTitle}>Account</Text>
					</Link>
				</View>
				<View>
					<Link href="/settings/catProfile">
						<Text style={globalStyles.sectionTitle}>
							Cat Profile
						</Text>
					</Link>
				</View>
				<View>
					<Link href="/settings/notifications">
						<Text style={globalStyles.sectionTitle}>
							Notifications
						</Text>
					</Link>
				</View>
				<View>
					{/* TODO: Remove this later on, its only here to test */}
					<Link href="/onboarding">
						<Text style={globalStyles.sectionTitle}>
							Onboarding
						</Text>
					</Link>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "flex-start",
		backgroundColor: colors.background,
		paddingHorizontal: 16,
	},

	cardContainer: {
		justifyContent: "flex-start",
		alignItems: "flex-start",
		backgroundColor: colors.cardBackground,

		padding: 30,
		marginBottom: 10,
		marginTop: 10,
		borderRadius: 12,
	},

	title: {
		marginTop: 20,
		fontSize: 24,
		color: colors.text,
	},
});
