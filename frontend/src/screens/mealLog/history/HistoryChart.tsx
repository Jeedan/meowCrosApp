import { DayHistory } from "@/data/dummyData";
import { colors } from "@/styles/global";
import React from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	useWindowDimensions,
} from "react-native";
import { Bar, CartesianChart } from "victory-native";
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

	const { width: screenWidth } = useWindowDimensions();
	const shouldScroll = data.length > 7;
	const dayWidth = screenWidth / 7;
	const chartWidth = shouldScroll ? data.length * dayWidth : screenWidth;

	const barWidth = dayWidth * 0.6;

	// don't render chart until font loading is completed
	if (!font) {
		return <View style={styles.container} />;
	}

	const chart = (
		<View style={[styles.chartContainer, { width: chartWidth }]}>
			<CartesianChart
				data={chartData}
				xKey="x"
				yKeys={["consumed"]}
				domainPadding={{
					left: 20,
					right: 20,
					top: 20,
					bottom: 20,
				}}
				xAxis={{
					font,
					tickCount: data.length,
					labelColor: colors.text,
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
						barCount={data.length}
						barWidth={barWidth}
						color={colors.secondary}
					/>
				)}
			</CartesianChart>
		</View>
	);

	if (shouldScroll) {
		return (
			<View style={styles.container}>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{chart}
				</ScrollView>
			</View>
		);
	}

	return <View style={styles.container}>{chart}</View>;
}

const styles = StyleSheet.create({
	container: {
		height: 250,
		width: "100%",
	},
	chartContainer: {
		paddingHorizontal: 8,
		height: 250,
	},
});
