import { StyleSheet, Text, View } from "react-native";
import Button from "@/components/Button";
import {
	colors,
	globalStyles,
	icons,
	radius,
	spacing,
	typography,
} from "@/styles/global";
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

	const currentWeekDay = currentDay.split(" ", 1);
	const day = currentDay.split(`${currentWeekDay.toString()} `, 2).join("");
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
						size={icons.sm}
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
				) : (
					<Text style={[globalStyles.sectionTitle, styles.today]}>
						{currentWeekDay}
					</Text>
				)}
				<Text
					style={[globalStyles.sectionTitle, styles.date]}
					numberOfLines={1}
				>
					{day}
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
						size={icons.sm}
						color={colors.text}
					></Ionicons>
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	rowContainer: {
		backgroundColor: colors.cardBackground,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.sm,
		gap: spacing.xs,
	},

	arrowContainer: {
		justifyContent: "center",
		alignItems: "center",
	},

	dateArrow: {
		paddingVertical: spacing.sm,
		paddingHorizontal: spacing.md,
		backgroundColor: colors.cardBackground,
		borderColor: colors.text,
		borderWidth: 0.5,
		borderRadius: radius.lg,
	},

	dateContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	today: {
		fontSize: typography.bodyLarge,
		color: colors.text,
		paddingHorizontal: spacing.lg,
		marginBottom: spacing.none,
	},

	date: {
		fontWeight: "300",
	},
});
