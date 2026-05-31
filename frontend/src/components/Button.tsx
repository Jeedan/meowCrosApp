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
				styles.active,
				pressed && styles.buttonPressed,
				style,
				disabled && styles.disabled,
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
		paddingVertical: 14,
		paddingHorizontal: 14,
		borderRadius: 4,
		marginTop: 16,
	},

	buttonPressed: {
		opacity: 0.8,
	},

	active: {
		backgroundColor: colors.primary,
	},

	disabled: {
		backgroundColor: colors.disabled,
	},
});
