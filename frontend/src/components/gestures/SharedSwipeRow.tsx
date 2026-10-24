import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";
import { Ionicons } from "@expo/vector-icons";
import { colors, icons, radius, spacing } from "@/styles/global";
import Button from "../Button";

const ACTION_WIDTH = 72;

type SharedSwipeRowProps = {
	children: React.ReactNode;
	onDeletePress: () => void;
};

export default function SharedSwipeRow({
	children,
	onDeletePress,
}: SharedSwipeRowProps) {
	const translateX = useSharedValue(0);
	const startX = useSharedValue(0);
	const pan = useMemo(
		() =>
			Gesture.Pan()
				.activeOffsetX([-10, 10])
				.failOffsetY([-10, 10])
				.onStart(() => {
					startX.value = translateX.value;
				})
				.onUpdate((event) => {
					translateX.value = Math.max(
						-ACTION_WIDTH,
						Math.min(0, startX.value + event.translationX),
					);
				})
				.onEnd(() => {
					const shouldOpen = translateX.value < -ACTION_WIDTH / 2;
					translateX.value = withSpring(
						shouldOpen ? -ACTION_WIDTH : 0,
					);
				}),
		[translateX, startX],
	);

	const rowStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	return (
		<View style={styles.container}>
			<Button
				onPress={onDeletePress}
				style={styles.deleteAction}
				accessibilityRole="button"
				accessibilityLabel="Delete meal"
			>
				<Ionicons
					name="trash-outline"
					size={icons.md}
					color={colors.text}
				/>
			</Button>

			<GestureDetector gesture={pan}>
				<Animated.View style={[styles.row, rowStyle]}>
					{children}
				</Animated.View>
			</GestureDetector>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		position: "relative",
		marginBottom: spacing.md,
	},

	deleteAction: {
		position: "absolute",
		right: 0,
		top: 0,
		bottom: 0,
		width: ACTION_WIDTH,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#d93636",
		borderRadius: radius.lg,
	},

	deleteText: {
		color: "#ffffff",
		fontWeight: "600",
	},

	row: {
		overflow: "hidden",
		borderRadius: radius.lg,
	},
});
