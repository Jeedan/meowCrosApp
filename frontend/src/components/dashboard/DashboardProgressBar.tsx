import { colors, radius, spacing, typography } from "@/styles/global";
import { useEffect, useRef, useState } from "react";
import {
	Animated,
	Easing,
	LayoutChangeEvent,
	StyleSheet,
	Text,
	View,
} from "react-native";

type DashboardProgressBarProps = {
	calorieBreakdown: {
		consumed: number;
		consumedPercentage: number;
		total: number;
	};
};

export default function DashboardProgressBar({
	calorieBreakdown,
}: DashboardProgressBarProps) {
	const [containerWidth, setContainerWidth] = useState(0);
	const cappedWidthPercentage = Math.min(
		100,
		calorieBreakdown.consumedPercentage,
	);
	const animatedWidth = useRef(new Animated.Value(0)).current;

	const remainingCalories =
		calorieBreakdown.total - calorieBreakdown.consumed;

	useEffect(() => {
		const targetWidth = (cappedWidthPercentage / 100) * containerWidth;
		Animated.timing(animatedWidth, {
			toValue: targetWidth,
			duration: 300,
			easing: Easing.out(Easing.ease),
			useNativeDriver: false,
		}).start();
	}, [cappedWidthPercentage, containerWidth]);

	// we only want to show a warning if going above
	const barColor = (percentage: number) => {
		if (percentage > 110) {
			return colors.alert;
		}

		if (percentage >= 100 && percentage <= 110) {
			return colors.warning;
		}

		return colors.primary;
	};

	const handleLayout = (event: LayoutChangeEvent) => {
		setContainerWidth(event.nativeEvent.layout.width);
	};

	return (
		<View style={styles.container}>
			{/* Title */}
			<Text style={styles.title}>Daily Calorie intake</Text>
			{/* Calories */}
			<View style={styles.calorieRow}>
				<Text style={styles.currentCalories}>
					{calorieBreakdown.consumed}
				</Text>

				<Text style={styles.totalCalories}>
					/ {calorieBreakdown.total} kcal
				</Text>
			</View>

			{/* The bar */}
			<View style={styles.progressContainer} onLayout={handleLayout}>
				{/* width: `${Math.min(100, calorieBreakdown.consumedPercentage)}%` */}
				<Animated.View
					style={[
						styles.progressBar,
						{
							width: animatedWidth,
							backgroundColor: barColor(
								calorieBreakdown.consumedPercentage,
							),
						},
					]}
				></Animated.View>
			</View>
			{/* Footer */}
			<Text style={styles.cardSubText}>
				{remainingCalories} kcal remaining
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "flex-start",
		backgroundColor: colors.cardBackground,
		width: "auto",
		borderRadius: radius.lg,
		paddingHorizontal: spacing.md,
		paddingBottom: spacing.md,
		paddingTop: spacing.md,
		marginBottom: spacing.sm,
	},

	centered: {
		justifyContent: "center",
		alignItems: "center",
		marginBottom: spacing.md,
	},

	calorieRow: {
		flexDirection: "row",
		alignItems: "baseline",
		gap: spacing.sm,
		marginTop: spacing.xs,
		marginBottom: spacing.sm,
	},

	totalCalories: {
		color: colors.textSecondary,
		fontSize: typography.bodyLarge,
	},

	currentCalories: {
		fontSize: typography.display,
		fontWeight: "700",
		color: colors.text,
		lineHeight: 42,
	},

	title: {
		fontSize: typography.body,
		fontWeight: "600",
		color: colors.textSecondary,
	},

	cardSubText: {
		fontSize: typography.caption,
		color: colors.textSecondary,
		marginTop: spacing.xxs,
	},

	progressContainer: {
		justifyContent: "flex-start",
		alignItems: "flex-start",
		borderRadius: radius.pill,
		borderWidth: StyleSheet.hairlineWidth,
		backgroundColor: colors.cardForeGround,
		width: "100%",
		height: 15,
		overflow: "hidden",
		marginBottom: spacing.sm,
	},

	progressBar: {
		borderRadius: radius.pill,
		height: "100%",
	},
});
