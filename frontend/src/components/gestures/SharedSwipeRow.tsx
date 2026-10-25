import React, { useEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	SharedValue,
	useAnimatedReaction,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { colors, icons, radius, spacing } from "@/styles/global";
import Button from "../Button";

const ACTION_WIDTH = 72;
const SWIPE_DURATION = 150;

type SharedSwipeRowProps = {
	children: React.ReactNode;
	onDeletePress: () => void;
	rowId: string;
	openSwipeRowId: SharedValue<string | null>;
};

export default function SharedSwipeRow({
	children,
	onDeletePress,
	rowId,
	openSwipeRowId,
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

					if (event.translationX < -10) openSwipeRowId.value = rowId;
				})
				.onEnd(() => {
					const shouldOpen = translateX.value < -ACTION_WIDTH / 2;
					translateX.value = withSpring(
						shouldOpen ? -ACTION_WIDTH : 0,
						{ duration: SWIPE_DURATION },
					);

					// if open give openswiperow its id
					// if it already has an id reset it
					if (shouldOpen) {
						openSwipeRowId.value = rowId;
					} else if (openSwipeRowId.value === rowId) {
						openSwipeRowId.value = null;
					}
				}),
		[translateX, startX, rowId],
	);

	const rowStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	useAnimatedReaction(
		() => openSwipeRowId.value,
		(activeRowId) => {
			if (activeRowId !== rowId && translateX.value !== 0) {
				translateX.value = withSpring(0, { duration: SWIPE_DURATION });
			}
		},
		[rowId],
	);

	useEffect(() => {
		translateX.value = 0;
		startX.value = 0;
	}, [rowId, startX, translateX]);

	return (
		<View style={styles.container}>
			<Button
				onPress={onDeletePress}
				style={styles.deleteAction}
				accessibilityRole="button"
				accessibilityLabel="Delete meal"
			>
				<View style={styles.deleteButtonContent}>
					<Ionicons
						name="trash-outline"
						size={icons.md}
						color={colors.text}
					/>
				</View>
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
		paddingVertical: 0,
		paddingHorizontal: 0,
		width: ACTION_WIDTH,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "transparent",
		borderRadius: radius.lg,
	},

	deleteButtonContent: {
		height: "100%",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.alert,
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
