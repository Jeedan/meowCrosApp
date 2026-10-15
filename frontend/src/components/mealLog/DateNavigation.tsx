import { StyleSheet, Text, View } from "react-native";
import Button from "@/components/Button";
import { colors, globalStyles, icons } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";

type DateNavigationProps = {
	currentDay: string;
	displayToday: boolean;
	onPress: (n: number) => void;
};

export default function DateNavigation({
	currentDay,
	displayToday,
	onPress,
}: DateNavigationProps) {
	const NEXT_DAY = -1;
	const PREV_DAY = 1;
	return (
		<View style={styles.rowContainer}>
			{/* Previous */}
			<View style={styles.arrowContainer}>
				<Button
					style={styles.dateArrow}
					onPress={() => {
						console.log("Navigate previous day");
						onPress(PREV_DAY);
					}}
				>
					<Ionicons
						name="chevron-back-sharp"
						size={icons.sizeXS}
						color={colors.text}
					></Ionicons>
				</Button>
			</View>
			{/* date */}
			<View style={styles.dateContainer}>
				{displayToday ? (
					<Text style={[globalStyles.sectionTitle, styles.today]}>
						Today
					</Text>
				) : null}
				<Text
					style={[
						globalStyles.sectionTitle,
						displayToday ? styles.date : styles.today,
					]}
					numberOfLines={1}
				>
					{currentDay}
				</Text>
			</View>
			{/* Next */}
			<View style={styles.arrowContainer}>
				<Button
					style={styles.dateArrow}
					onPress={() => {
						console.log("Navigate next day");
						onPress(NEXT_DAY);
					}}
				>
					<Ionicons
						name="chevron-forward-sharp"
						size={icons.sizeXS}
						color={colors.text}
					></Ionicons>
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	rowContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 15,
		gap: 6,
	},

	arrowContainer: {
		justifyContent: "center",
		alignItems: "center",
	},

	dateArrow: {
		paddingVertical: 10,
		paddingHorizontal: 16,
		backgroundColor: colors.background,
		borderColor: colors.text,
		borderWidth: 0.5,
		borderRadius: 12,
	},

	dateContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	today: {
		fontSize: 18,
		color: colors.text,
		paddingHorizontal: 16,
		marginBottom: 0,
	},

	date: {
		fontWeight: "300",
	},
});
