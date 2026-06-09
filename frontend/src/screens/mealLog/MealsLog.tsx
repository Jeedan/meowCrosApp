import Button from "@/components/Button";
import DashboardFeeding from "@/components/dashboard/DashboardFeeding";
import EmptyState from "@/components/EmptyState";
import { useFeedingLog } from "@/store/store";
import { colors, globalStyles } from "@/styles/global";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function MealsLogScreen() {
	const onPressHandler = () => {
		console.log("navigating to addMeal screen");
		router.push("/addmeal");
	};

	const feedingLog = useFeedingLog((state) => state.feedingLog);

	// TODO: loop over feeding log and display each feeding in a card.
	// TODO: Header should display "Today | Last 7 Days | All Time" as tabs 
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

const styles = StyleSheet.create({
	pickButton: {
		borderRadius: 14,
	},

	confirmButton: {
		borderRadius: 14,
		alignItems: "flex-end",
	},

	textColor: {
		color: colors.text,
	},
});
