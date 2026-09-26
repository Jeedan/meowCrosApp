import { useAppFont } from "@/context/FontContext";
import { DayHistory } from "@/data/dummyData";
import { colors } from "@/styles/global";
import React, { useEffect, useRef } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import { Bar, CartesianChart, Line } from "victory-native";

type HistoryBarChartProps = {
	data: DayHistory[];
};

const CHART_HEIGHT = 250;
const VISIBLE_DAYS = 7;
const EXTRA_FUTURE_DAYS = 2;
const Y_AXIS_WIDTH = 32;
const DAY_WIDTH = 48;

const Y_TICK_COUNT = 5;

// the minimum value the Y-axis is allowed to reach
const MIN_Y_AXIS_LABEL = 350;
// how much empty space above the tallest bar
const Y_AXIS_HEADROOM_PERCENT = 20;
// what the Y-axis maximum rounds to
const Y_AXIS_ROUNDING_INCREMENT = 100;

export default function HistoryBarChart({ data }: HistoryBarChartProps) {
	const font = useAppFont();
	const { width: screenWidth } = useWindowDimensions();

	const scrollViewRef = useRef<ScrollView>(null);

	// TODO pass target from History Screen as props
	const chartData = [
		...data.map((day, index) => ({
			x: index,
			date: day.date,
			consumed: day.consumed,
			target: 240,
		})),
		// create an array with empty consumed to extend the chart
		...Array.from({ length: EXTRA_FUTURE_DAYS }, (_, index) => {
			const lastDate = data[data.length - 1]?.date ?? Date.now();
			const date = new Date(lastDate);
			date.setDate(date.getDate() + index + 1);
			return {
				x: data.length + index,
				date: date.getTime(),
				consumed: 0,
				target: 240,
			};
		}),
	];

	/*can you exx
	 * Keep the Y range deterministic.
	 */
	const maxConsumed = Math.max(
		MIN_Y_AXIS_LABEL,
		...chartData.map((day) => day.consumed),
	);

	const yMax =
		Math.ceil(
			(maxConsumed * (1 + Y_AXIS_HEADROOM_PERCENT / 100)) /
				Y_AXIS_ROUNDING_INCREMENT,
		) * Y_AXIS_ROUNDING_INCREMENT;

	/*
	 * Width available to the scrolling chart.
	 */
	const viewportWidth = Math.max(1, screenWidth - Y_AXIS_WIDTH - 16);
	const contentWidth = Math.max(viewportWidth, chartData.length * DAY_WIDTH);
	const barWidth = DAY_WIDTH * 0.6;

	/*
	 * Scroll to the newest 7 days initially.
	 *
	 * IMPORTANT:
	 * This hook is before the font early-return.
	 */
	useEffect(() => {
		if (!font || chartData.length <= VISIBLE_DAYS) {
			return;
		}

		const realContentWidth = data.length * DAY_WIDTH;
		const maxScrollX = Math.max(0, realContentWidth - viewportWidth);
		requestAnimationFrame(() => {
			scrollViewRef.current?.scrollTo({
				x: maxScrollX,
				animated: false,
			});
		});
	}, [font, chartData.length, viewportWidth]);

	// TODO: Skia font loading is causing massive delay.
	// an option is to render X-axis and Y-axis separately
	// as React Native views
	// then calculate the X and Y positions to create
	// the labels and grid lines manually.
	if (!font) {
		return <View style={styles.container} />;
	}

	/*
	 * These are the same approximate tick values Victory will
	 * display for the Y axis.
	 *
	 * We render these as normal RN Text so they remain fixed
	 * while the CartesianChart scrolls.
	 */
	const yTicks = Array.from({ length: Y_TICK_COUNT }, (_, index) => {
		return (yMax / (Y_TICK_COUNT - 1)) * index;
	});
	return (
		<View style={styles.container}>
			<View style={styles.chartRow}>
				{/* ============================================
				    SCROLLING AREA
				    ============================================ */}

				<View style={styles.scrollArea}>
					<ScrollView
						ref={scrollViewRef}
						horizontal
						showsHorizontalScrollIndicator={false}
						bounces={true}
						overScrollMode="never"
						contentContainerStyle={{
							width: contentWidth,
						}}
					>
						<CartesianChart
							data={chartData}
							xKey="x"
							yKeys={["consumed", "target"]}
							domain={{
								x: [0, Math.max(0, chartData.length - 1)],
								y: [0, yMax],
							}}
							domainPadding={{
								left: 20,
								right: 20,
								top: 20,
								bottom: 20,
							}}
							xAxis={{
								font,
								labelColor: colors.text,
								tickCount: chartData.length,

								formatXLabel: (value) => {
									const day = chartData[value];

									if (!day) {
										return "";
									}

									return new Date(
										day.date,
									).toLocaleDateString(undefined, {
										weekday: "short",
									});
								},
							}}
							yAxis={[
								{
									/*
									 * We deliberately hide the
									 * Victory Y labels.
									 *
									 * The fixed RN labels on the
									 * right handle those.
									 */
									font,
									axisSide: "right",
									tickCount: Y_TICK_COUNT,
									formatYLabel: () => "",

									/*
									 * Horizontal grid lines.
									 *
									 * Victory's CartesianAxis uses
									 * lineColor.grid for these.
									 */
									lineColor: colors.textSecondary,
									lineWidth: 0.5,
								},
							]}
						>
							{({ points, chartBounds }) => (
								<>
									<Bar
										chartBounds={chartBounds}
										points={points.consumed}
										barCount={chartData.length}
										barWidth={barWidth}
										color={colors.secondary}
									/>

									<Line
										points={points.target}
										color={colors.text}
										strokeWidth={2}
									/>
								</>
							)}
						</CartesianChart>
					</ScrollView>
				</View>

				{/* ============================================
				    FIXED Y AXIS
				    ============================================ */}

				<View style={styles.fixedYAxis}>
					<View style={styles.yAxisLabels}>
						{yTicks
							.slice()
							.reverse()
							.map((value, index) => (
								<Text
									key={`${value}-${index}`}
									style={styles.yLabel}
								>
									{Math.round(value)}
								</Text>
							))}
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: CHART_HEIGHT,
		paddingHorizontal: 8,
	},

	chartRow: {
		width: "100%",
		height: CHART_HEIGHT,
		flexDirection: "row",
	},

	scrollArea: {
		flex: 1,
		height: CHART_HEIGHT,
	},

	fixedYAxis: {
		width: Y_AXIS_WIDTH,
		height: CHART_HEIGHT,
		backgroundColor: colors.background,

		/*
		 * Put the fixed axis above the scrolling content.
		 */
		zIndex: 10,
	},

	yAxisLabels: {
		flex: 1,

		/*
		 * Match the chart's top/bottom domain padding.
		 */
		paddingTop: 20,
		paddingBottom: 20,

		marginBottom: 12,
		justifyContent: "space-between",
		alignItems: "flex-end",
	},

	yLabel: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		color: colors.text,
		lineHeight: 14,
	},
});
