import { colors } from "@/styles/global";
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
		borderRadius: 12,
		paddingHorizontal: 10,
		paddingBottom: 12,
		paddingTop: 12,
		marginBottom: 6,
	},

	centered: {
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
	},

	calorieRow: {
		flexDirection: "row",
		alignItems: "baseline",
		gap: 6,
		marginTop: 4,
		marginBottom: 6,
	},

	totalCalories: {
		color: colors.textSecondary,
		fontSize: 18,
	},

	currentCalories: {
		fontSize: 36,
		fontWeight: "700",
		color: colors.text,
		lineHeight: 42,
	},

	title: {
		fontSize: 16,
		fontWeight: "600",
		color: colors.textSecondary,
	},

	cardSubText: {
		fontSize: 14,
		color: colors.textSecondary,
		marginTop: 2,
	},

	progressContainer: {
		justifyContent: "flex-start",
		alignItems: "flex-start",
		borderRadius: 20,
		borderWidth: StyleSheet.hairlineWidth,
		backgroundColor: colors.cardForeGround,
		width: "100%",
		height: 15,
		overflow: "hidden",
		marginBottom: 6,
	},

	progressBar: {
		borderRadius: 40,
		height: "100%",
	},
});
