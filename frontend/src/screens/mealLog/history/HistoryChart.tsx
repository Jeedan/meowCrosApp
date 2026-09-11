import { DayHistory } from "@/data/dummyData";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Bar, CartesianChart } from "victory-native";

type HistoryBarChartProps = {
	data: DayHistory[];
};

export default function HistoryBarChart({ data }: HistoryBarChartProps) {
	return (
		<View style={styles.container}>
			<CartesianChart
				data={data}
				xKey="date"
				yKeys={["consumed"]}
				domainPadding={{
					left: 20,
					right: 20,
					top: 20,
				}}
				axisOptions={{
					formatXLabel: (value) =>
						new Date(value).toLocaleDateString(undefined, {
							weekday: "short",
						}),
				}}
			>
				{({ points, chartBounds }) => (
					<Bar
						chartBounds={chartBounds}
						points={points.consumed}
						barCount={data.length}
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
	},
});
