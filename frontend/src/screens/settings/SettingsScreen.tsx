import { colors, globalStyles, icons } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const settingsLinks = [
	{ title: "Account", href: "/settings/account" as const },
	{ title: "Cat Profile", href: "/settings/catProfile" as const },
	{ title: "Notifications", href: "/settings/notifications" as const },
	{ title: "Onboarding", href: "/onboarding" as const },
];
// TODO: setup sub screens in _layout.tsx app router
export default function SettingsScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>General</Text>

			<View style={styles.card}>
				{settingsLinks.map((item, index) => (
					<View key={item.title + index}>
						<Link href={item.href} asChild>
							<Pressable style={styles.row}>
								<Text style={styles.linkText}>
									{item.title}
								</Text>
								<Ionicons
									name="chevron-forward"
									size={icons.sizeS}
									color={colors.divider}
								/>
							</Pressable>
						</Link>
						{/* only show a divider if we are not at the end */}
						{index < settingsLinks.length - 1 && (
							<View style={styles.divider} />
						)}
					</View>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		paddingHorizontal: 16,
	},

	card: {
		backgroundColor: colors.cardBackground,
		borderRadius: 12,
		paddingHorizontal: 16,
	},

	title: {
		fontSize: 20,
		color: colors.text,
		marginTop: 20,
		marginBottom: 16,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		minHeight: 56,
	},

	linkText: {
		fontSize: 18,
		color: colors.text,
	},

	divider: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: "#414141",
	},
});
