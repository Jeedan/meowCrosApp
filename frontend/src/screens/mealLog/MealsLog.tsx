import Button from "@/components/Button";
import DashboardFeeding from "@/components/dashboard/DashboardFeeding";
import EmptyState from "@/components/EmptyState";
import { useFeedingLog } from "@/store/store";
import { colors, globalStyles } from "@/styles/global";
import { formatDate, isToday } from "@/utils/dateUtils";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MealsLogScreen() {
	const onPressHandler = () => {
		console.log("navigating to addMeal screen");
		router.push("/addmeal");
	};

	const feedingLog = useFeedingLog((state) => state.feedingLog);

	const isEmpty = !feedingLog || feedingLog.length === 0;
	const today = formatDate(new Date());
	const todaysFeeding = feedingLog.filter((l) => isToday(l.loggedAt));

	if (isEmpty) {
		return (
			<View style={globalStyles.container}>
				<EmptyState
					label="
				Empty Meals Log, add a meal entry!"
				/>
				<View>
					<Button onPress={onPressHandler} style={styles.pickButton}>
						<Text style={styles.textColor}>Add Meal</Text>
					</Button>
				</View>
			</View>
		);
	}
	// TODO: loop over feeding log and display each feeding in a card.
	// TODO: Header should display "Today | Last 7 Days | All Time" as tabs
	return (
		<>
			{/* Display Feeding Time */}
			{/* a card of each meal */}
			{/* Today | 7 days | tabs */}
			<View style={styles.header}>
				<Text style={globalStyles.sectionTitle}>{today}</Text>
			</View>
			<SafeAreaView style={globalStyles.scrollContainer} edges={["top"]}>
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.container}>
						{todaysFeeding.map((log) => (
							<DashboardFeeding key={log.id} feedingLog={log} />
						))}
					</View>
				</ScrollView>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
	},

	scrollContent: {
		flexGrow: 1,
		paddingHorizontal: 20,
		paddingBottom: 40,
	},

	header: {
		backgroundColor: colors.background,
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 10,
	},

	pickButton: {
		borderRadius: 14,
	},

	textColor: {
		color: colors.text,
	},
});
