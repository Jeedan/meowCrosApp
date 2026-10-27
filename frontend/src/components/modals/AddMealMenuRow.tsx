import { colors, icons, spacing, typography } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type IconName = React.ComponentProps<typeof Ionicons>["name"];
type AddMealMenuRowProps = {
	labelText: string;
	subLabelText?: string;
	iconName: IconName;
	onPress: () => void;
	disabled?: boolean;
};
export default function AddMealMenuRow({
	labelText,
	subLabelText,
	iconName,
	onPress,
	disabled = false,
}: AddMealMenuRowProps) {
	if (disabled) return;
	return (
		<>
			{/* Links */}
			{/* [Icon] [Label]-- space -- [arrow icon] */}
			<View style={styles.linksContainer}>
				<Pressable
					style={styles.rowContainer}
					onPress={onPress}
					hitSlop={8}
					disabled={disabled}
				>
					<View style={[styles.side]}>
						<Ionicons
							name={iconName}
							size={icons.md}
							color={colors.text}
						></Ionicons>
					</View>

					<View style={styles.labelContainer}>
						<Text style={styles.label}>{labelText}</Text>
						{/* display sublabel if exists, used for hints */}
						{subLabelText ? (
							<Text
								style={styles.subLabel}
								numberOfLines={3}
								ellipsizeMode="tail"
							>
								{subLabelText}
							</Text>
						) : null}
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
		paddingVertical: spacing.sm,
	},

	linksContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "flex-start",
		minHeight: 40, // reduce spacing when adding button row above
		marginTop: spacing.xl,
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

	label: {
		fontSize: typography.body,
		color: colors.text,
		fontWeight: "600",
		textAlign: "justify",
	},

	subLabel: {
		fontSize: typography.caption,
		color: colors.textSecondary,
		textAlign: "left",
	},

	divider: {
		marginTop: spacing.xs,
		marginLeft: spacing.huge,
		height: 1,
		backgroundColor: colors.dismiss,
		opacity: 0.5,
	},

	disabled: {
		color: colors.disabled,
	},
});
