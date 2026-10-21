import {
	colors,
	dotSeparator,
	globalStyles,
	icons,
	radius,
	spacing,
	typography,
} from "@/styles/global";
import { formatDate, isToday } from "@/utils/dateUtils";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { catProfile } from "@/data/dummyData";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
	calcTotalDailyCalories,
	calorieBreakdown,
	caloriesConsumedPerDay,
	caloriesConsumedPercentage,
} from "@/utils/calorieCalculator";
import DashboardProgressBar from "@/components/dashboard/DashboardProgressBar";
import { useFeedingLog } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardScreen() {
	const today = formatDate(new Date());
	const feedingLog = useFeedingLog((state) => state.feedingLog);
	const todaysFeeding = feedingLog.filter((l) => isToday(l.loggedAt));
	const isEmpty = todaysFeeding.length === 0;
	// todo give default values when empty
	const lastMeal = todaysFeeding[todaysFeeding.length - 1];
	const lastFood = lastMeal?.plate ?? [];
	const lastFedAt = lastMeal
		? lastMeal.loggedAt.toLocaleTimeString("en-GB", {
				hour: "2-digit",
				minute: "2-digit",
			})
		: "No Meals yet";
	// TODO: create a feeding interval constant from settings at some point
	const convertToMilliseconds = 60 * 60 * 1000;
	const earliestNextMealInterval = 2;
	const latestNextMealInterval = 3;
	const lastMealTime = lastMeal ? lastMeal.loggedAt : new Date();

	const earliestNextMeal = lastMeal
		? new Date(
				lastMealTime.getTime() +
					earliestNextMealInterval * convertToMilliseconds,
			)
		: new Date();

	const latestNextMeal = lastMeal
		? new Date(
				lastMealTime.getTime() +
					latestNextMealInterval * convertToMilliseconds,
			)
		: new Date();

	const earliestNextMealFormatted = earliestNextMeal.toLocaleTimeString(
		"en-GB",
		{
			hour: "2-digit",
			minute: "2-digit",
		},
	);
	const latestNextMealFormatted = latestNextMeal.toLocaleTimeString("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
	});
	const totalMealsSoFar = todaysFeeding.length;

	// Todo: move calorie calculations into a different component
	const totalDailyCalories = calcTotalDailyCalories(catProfile);
	const calsConsumed = caloriesConsumedPerDay(todaysFeeding);
	const consumedPercentage = caloriesConsumedPercentage(
		calsConsumed,
		totalDailyCalories,
	);
	const caloricBreakdown = calorieBreakdown(
		calsConsumed,
		consumedPercentage,
		totalDailyCalories,
	);

	const lastMealCaloriesConsumed = lastFood.reduce(
		(a, meal) => a + meal.kcalCalculated,
		0,
	);
	const lastMealGramsConsumed = lastFood.reduce(
		(a, meal) => a + meal.gramsServed,
		0,
	);

	const emptyCard = () => {
		return (
			<View style={[styles.card, styles.emptyState]}>
				<Text style={styles.cardText}>No meals logged today.</Text>
			</View>
		);
	};
	return (
		<SafeAreaView style={globalStyles.scrollContainer} edges={["top"]}>
			<ScrollView
				contentContainerStyle={globalStyles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.container}>
					<DashboardHeader today={today} catName={catProfile.name} />
				</View>

				<DashboardProgressBar calorieBreakdown={caloricBreakdown} />

				<Text style={styles.cardHeader}>Feeding Overview</Text>
				{isEmpty ? (
					emptyCard()
				) : (
					<View style={styles.cardsRow}>
						<View style={styles.overviewCard}>
							<Text style={styles.cardSubText}>Last Fed At</Text>

							<View style={styles.overviewTitleContainer}>
								<Text style={[styles.overviewCardTitle]}>
									{lastFedAt}
								</Text>
							</View>

							<Text style={styles.cardSubText}>
								Most recent meal
							</Text>
						</View>
						<View style={styles.overviewCard}>
							<Text style={styles.cardSubText}>Meals Eaten</Text>
							<View style={styles.overviewTitleContainer}>
								<Text style={[styles.overviewCardTitle]}>
									{totalMealsSoFar}
								</Text>
							</View>

							<Text style={styles.cardSubText}>
								Logged so far
							</Text>
						</View>
						<View style={styles.overviewCard}>
							<Text style={styles.cardSubText}>Next Meal At</Text>
							<View style={styles.timeRange}>
								<Text style={styles.timeRangeText}>
									{earliestNextMealFormatted}
								</Text>
								<Text style={styles.overviewDivider}>-</Text>
								<Text style={styles.timeRangeText}>
									{latestNextMealFormatted}
								</Text>
							</View>
							<Text style={styles.cardSubText}>
								Estimated Window
							</Text>
						</View>
					</View>
				)}

				{/* LAST MEAL */}
				<Text style={styles.cardHeader}>Last Meal</Text>
				{isEmpty ? (
					emptyCard()
				) : (
					<View style={styles.card}>
						{lastFood.map((item) => (
							<View style={styles.row} key={item.id}>
								<View style={styles.foodIcon}>
									<Ionicons
										name="fish-outline"
										size={icons.md}
										color={colors.text}
									/>
								</View>

								<View style={styles.foodInfo}>
									<Text
										style={[
											styles.cardText,
											styles.foodName,
										]}
										numberOfLines={1}
									>
										{item.foodNameSnapshot}
									</Text>
									<View style={[styles.foodTypeRow]}>
										<Text style={[styles.capitalize]}>
											{item.foodType}{" "}
										</Text>
										<Text style={styles.cardSubText}>
											food {dotSeparator}{" "}
											{item.gramsServed} g
										</Text>
									</View>
								</View>

								<Text style={styles.cardText}>
									{item.kcalCalculated} kcal
								</Text>
							</View>
						))}

						<View style={styles.divider} />
						<View style={[styles.row, styles.foodSummary]}>
							<Text style={styles.cardSubText}>Meal Total:</Text>
							<Text style={styles.cardText}>
								{lastMealGramsConsumed} g {dotSeparator}{" "}
								{lastMealCaloriesConsumed} kcal
							</Text>
						</View>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "flex-start",
	},

	emptyState: {
		justifyContent: "center",
		alignItems: "center",
		height: 52,
	},

	divider: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: colors.cardForeGround,
		marginVertical: spacing.xs,
	},

	card: {
		backgroundColor: colors.cardBackground,
		width: "auto",
		borderRadius: radius.lg,
		paddingHorizontal: spacing.lg,
		paddingBottom: spacing.sm,
		paddingTop: spacing.md,
		marginBottom: spacing.sm,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		minHeight: 52,
		gap: spacing.md,
		marginBottom: spacing.sm,
	},

	cardHeader: {
		fontSize: typography.title,
		fontWeight: "bold",
		color: colors.text,
		marginBottom: spacing.sm,
		marginTop: spacing.xs,
	},

	// unused??
	cardTitle: {
		fontSize: typography.bodyLarge,
		fontWeight: "bold",
		color: colors.text,
		marginBottom: spacing.xs,
		marginTop: spacing.sm,
	},

	cardText: {
		fontSize: typography.bodyLarge,
		color: colors.text,
	},

	cardSubText: {
		fontSize: typography.label,
		color: colors.textSecondary,
		textAlign: "justify",
	},

	capitalize: {
		fontSize: typography.label,
		color: colors.textSecondary,
		textTransform: "capitalize",
	},

	foodTypeRow: {
		flexDirection: "row",
	},

	foodSummary: {
		justifyContent: "space-between",
		marginBottom: spacing.none,
	},

	foodInfo: {
		flex: 1,
		minWidth: spacing.none,
		gap: spacing.xxs,
	},

	foodName: {
		flexShrink: 1,
	},

	foodIcon: {
		width: 40,
		height: 40,
		borderRadius: radius.lg,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.cardForeGround,
	},

	cardsRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: spacing.sm,
		marginBottom: spacing.md,
	},

	overviewCard: {
		backgroundColor: colors.cardBackground,
		width: 150,
		height: 150,
		borderRadius: radius.lg,
		padding: spacing.md,
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},

	overviewCardTitle: {
		fontSize: typography.display,
		fontWeight: "700",
		color: colors.text,
		lineHeight: 42,
	},

	overviewDivider: {
		fontSize: typography.title,
		textAlign: "justify",
		color: colors.text,
	},

	overviewTitleContainer: {
		width: "100%",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	timeRange: {
		flex: 1,
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: spacing.xs,
	},

	timeRangeText: {
		fontSize: typography.title,
		fontWeight: "700",
		color: colors.text,
	},
});
