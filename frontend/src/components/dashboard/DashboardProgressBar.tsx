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
	const cappedWidthPercentage = Math.min(100, calorieBreakdown.consumedPercentage);
	const animatedWidth = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const targetWidth = (cappedWidthPercentage / 100) * containerWidth;
		Animated.timing(animatedWidth, {
			toValue: targetWidth,
			duration: 300,
			easing: Easing.out(Easing.ease),
			useNativeDriver: false,
		}).start();
	}, [cappedWidthPercentage, containerWidth]);

	const barColor = (percentage: number) => {
		if (percentage > 100) {
			return colors.alert;
		}

		if (percentage >= 90 && percentage <= 100) {
			return colors.warning;
		}

		return colors.primary;
	};

	const handleLayout = (event: LayoutChangeEvent) => {
		setContainerWidth(event.nativeEvent.layout.width);
	};

	return (
		<>
			{/* Header */}
			<Text style={styles.calories}>
				Daily Calorie target: {calorieBreakdown.total} kcal
			</Text>
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
			<Text style={styles.calories}>
				{calorieBreakdown.consumed}
				{" / "}
				{calorieBreakdown.total} kcal
			</Text>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "flex-start",
	},

	centered: {
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
	},

	calories: {
		color: colors.textSecondary,
		fontSize: 18,
		marginTop: 4,
		marginBottom: 6,
	},

	progressContainer: {
		justifyContent: "flex-start",
		alignItems: "flex-start",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: colors.text,
		width: "90%",
		height: 20,
		overflow: "hidden",
	},

	progressBar: {
		borderRadius: 40,
		height: "100%",
	},
});
