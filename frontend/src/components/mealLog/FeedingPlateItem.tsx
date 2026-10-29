import {
	colors,
	dotSeparator,
	icons,
	radius,
	spacing,
	typography,
} from "@/styles/global";
import { PlateItem } from "@shared/types/meal";
import { StyleSheet, Text, View } from "react-native";

import SharedSwipeRow from "../gestures/SharedSwipeRow";
import React from "react";
import { SharedValue } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import WetFoodIcon from "../icons/WetFoodIcon";
import DryFoodIcon from "../icons/DryFoodBag";

type FeedingPlateItemProps = {
	meal: PlateItem;
	feedingLogId: string;
	onRequestDelete: (feedingLogId: string, mealId: string) => void;
	openSwipeRowId: SharedValue<string | null>;
};

function PlateContent({ meal }: { meal: PlateItem }) {
	// TODO: Replace with actual icons
	const renderFoodIcon = () => {
		if (meal.foodType === "dry") {
			return <DryFoodIcon size={icons.xl} color={colors.text} />;
		}
		return <WetFoodIcon size={icons.xl} color={colors.text} />;
	};

	return (
		<View style={styles.card}>
			{/* Row: Icon - Name + subtitle for brand - Chevron icon for editing */}

			<View style={styles.header}>
				<View style={[styles.icon, styles.foodIcon]}>
					<Ionicons
						name="fish-outline"
						size={icons.md}
						color={colors.text}
					/>
				</View>
				<View style={styles.headerText}>
					<Text style={styles.foodName} numberOfLines={2}>
						{meal.foodNameSnapshot}
					</Text>
					<Text style={styles.subtitle} numberOfLines={1}>
						{meal.foodType} food
					</Text>
					{/* Divider */}
					<View style={styles.divider} />

					{/* Serving and Last used */}
					<View style={styles.footer}>
						<Text style={styles.subtitle}>
							{meal.gramsServed}g {dotSeparator}
						</Text>
						<Text style={styles.nutritionValue}>
							{meal.kcalCalculated} kcal
						</Text>
					</View>
				</View>

				<View style={styles.icon}>
					<Ionicons
						name="chevron-forward"
						size={icons.md}
						color={colors.cardForeGround}
					/>
				</View>
			</View>
		</View>
	);
}

function FeedingPlateItem({
	meal,
	feedingLogId,
	onRequestDelete,
	openSwipeRowId,
}: FeedingPlateItemProps) {
	return (
		<SharedSwipeRow
			rowId={meal.id}
			onDeletePress={() => onRequestDelete(feedingLogId, meal.id)}
			openSwipeRowId={openSwipeRowId}
		>
			<PlateContent meal={meal} />
		</SharedSwipeRow>
	);
}

export default React.memo(FeedingPlateItem);

const styles = StyleSheet.create({
	swipeable: {
		width: 300,
	},

	icon: {
		width: 44,
		height: 44,
		borderRadius: radius.lg,
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
	},

	foodIcon: {
		backgroundColor: colors.cardForeGround,
		borderRadius: radius.lg,
	},

	card: {
		width: 300,
		minHeight: 72,
		padding: spacing.lg,
		borderRadius: radius.lg,
		backgroundColor: colors.cardBackground,
		gap: spacing.sm,
	},

	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.md,
	},

	headerText: {
		flex: 1,
		minWidth: 0,
		flexShrink: 1,
	},

	foodName: {
		fontSize: typography.bodyLarge,
		fontWeight: "600",
		color: colors.text,
		flexShrink: 1,
	},

	subtitle: {
		fontSize: typography.label,
		color: colors.textSecondary,
		textTransform: "capitalize",
	},

	footer: {
		flexDirection: "row",
		alignItems: "baseline",
		justifyContent: "flex-start",
		gap: spacing.sm,
	},

	nutritionValue: {
		fontSize: typography.label,
		fontWeight: "600",
		color: colors.text,
	},

	deleteContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: spacing.md,
		gap: spacing.sm,
	},

	deleteButton: {
		backgroundColor: colors.alert,
		marginTop: spacing.none,
		paddingVertical: spacing.md,
		paddingHorizontal: spacing.md,
		borderRadius: radius.xl,
	},

	divider: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: colors.cardForeGround,
		marginVertical: spacing.sm,
	},
});
