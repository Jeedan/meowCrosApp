import { colors, icons, spacing, typography } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type IconName = React.ComponentProps<typeof Ionicons>["name"];
type AddMealMenuRowProps = {
	labelText: string;
	iconName: IconName;
	onPress: () => void;
};
export default function AddMealMenuRow({
	labelText,
	iconName,
	onPress,
}: AddMealMenuRowProps) {
	return (
		<>
			{/* Links */}
			{/* [Icon] [Label]-- space -- [arrow icon] */}
			<View style={styles.linksContainer}>
				<Pressable
					style={styles.rowContainer}
					onPress={onPress}
					hitSlop={8}
				>
					<View style={[styles.side]}>
						<Ionicons
							name={iconName}
							size={22}
							color={colors.text}
						></Ionicons>
					</View>

					<View style={styles.labelContainer}>
						<Text style={styles.labelStyle}>{labelText}</Text>
					</View>

					<View style={[styles.side]}>
						<Ionicons
							name="chevron-forward-outline"
							size={icons.sm}
							color={colors.textSecondary}
						></Ionicons>
					</View>
				</Pressable>
			</View>

			{/* divider */}
			<View style={styles.divider}></View>
		</>
	);
}

const styles = StyleSheet.create({
	rowContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},

	linksContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		height: 40,
		// reduce spacing when adding button row above
		marginTop: spacing.huge,
	},

	side: {
		width: 52,
		justifyContent: "center",
		alignItems: "center",
	},
	labelContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
	},

	labelStyle: {
		fontSize: typography.body,
		color: colors.text,
		fontWeight: "600",
		textAlign: "justify",
	},

	divider: {
		marginTop: spacing.md,
		marginLeft: spacing.huge,
		height: 1,
		backgroundColor: colors.dismiss,
		opacity: 0.5,
	},
});
