import { DayHistory } from "@/data/dummyData";
import { colors } from "@/styles/global";
import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Bar, CartesianChart, useChartTransformState } from "victory-native";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import { useFont } from "@shopify/react-native-skia";

type HistoryBarChartProps = {
	data: DayHistory[];
};

export default function HistoryBarChart({ data }: HistoryBarChartProps) {
	const font = useFont(Inter_400Regular, 12);
	// convert data from unix stamp to a day category
	// Victory's x-axis needs a categorical/index representation
	const chartData = data.map((day, index) => ({
		x: index,
		date: day.date,
		consumed: day.consumed,
	}));

	const { state: transformState } = useChartTransformState();
	const { width: screenWidth } = useWindowDimensions();

	const dayWidth = screenWidth / 7;
	const barWidth = dayWidth * 0.6;

	// viewport is used to determine what is being shown right now
	const visibleDays = 7;
	const viewport =
		data.length > visibleDays
			? {
					x: [data.length - visibleDays, data.length - 1] as [
						number,
						number,
					],
				}
			: undefined;

	// don't render chart until font loading is completed
	if (!font) {
		return <View style={styles.container} />;
	}

	// TODO: revert back to Scrollview version because
	// the x-axis label delay is annoying.
	// going to need to fix the Y-axis so it doesn't scroll away
	return (
		<View style={styles.container}>
			<CartesianChart
				data={chartData}
				xKey="x"
				yKeys={["consumed"]}
				domain={{
					x: [0, data.length - 1],
				}}
				viewport={viewport}
				transformState={transformState}
				transformConfig={{
					pan: {
						enabled: true,
						dimensions: "x",
					},
					pinch: {
						enabled: false,
					},
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
					tickCount: data.length,
					formatXLabel: (value) => {
						const day = chartData[value];

						if (!day) return "";

						return new Date(day.date).toLocaleDateString(
							undefined,
							{
								weekday: "short",
							},
						);
					},
				}}
				yAxis={[
					{
						font,
						axisSide: "right",
						tickCount: 5,
						labelColor: colors.text,
						formatYLabel: (value) => `${Math.round(value)}`,
					},
				]}
			>
				{({ points, chartBounds }) => (
					<Bar
						chartBounds={chartBounds}
						points={points.consumed}
						barCount={chartData.length}
						barWidth={barWidth}
						color={colors.secondary}
					/>
				)}
			</CartesianChart>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 250,
		width: "100%",
		paddingHorizontal: 8,
	},
	chartContainer: {
		height: 250,
	},
});
