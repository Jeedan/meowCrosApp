import { colors } from "@/styles/global";
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
				<Pressable style={styles.rowContainer} onPress={onPress}>
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
							size={18}
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
		marginTop: 50,
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
		fontSize: 16,
		color: colors.text,
		fontWeight: "600",
		textAlign: "left",
	},

	divider: {
		marginTop: 10,
		marginLeft: 45,
		height: 1,
		backgroundColor: colors.dismiss,
		opacity: 0.5,
	},
});
