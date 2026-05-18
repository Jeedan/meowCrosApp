import { colors } from "@/styles/global";
import { ReactNode } from "react";
import {
	AccessibilityRole,
	Pressable,
	StyleProp,
	StyleSheet,
	ViewStyle,
} from "react-native";

type ButtonProps = {
	children: ReactNode;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
	disabled?: boolean;
	accessibilityRole?: AccessibilityRole | undefined;
	accessibilityLabel?: string;
};

export default function Button({
	children,
	style,
	disabled = false,
	accessibilityRole,
	accessibilityLabel,
	onPress,
}: ButtonProps) {
	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				pressed && styles.buttonPressed,
				style,
			]}
			onPress={onPress}
			accessibilityRole={accessibilityRole}
			accessibilityLabel={accessibilityLabel}
			disabled={disabled}
		>
			{children}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		backgroundColor: colors.primary,
		paddingVertical: 14,
		paddingHorizontal: 14,
		borderRadius: 4,
		marginTop: 16,
	},

	buttonPressed: {
		opacity: 0.8,
	},
});
