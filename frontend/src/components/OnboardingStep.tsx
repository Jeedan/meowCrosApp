import { colors } from "@/styles/global";
import { StyleSheet, View } from "react-native";

type OnboardingStepProps = {
	currentTab: number;
	tabId: number;
};

export default function OnboardingStep({
	currentTab,
	tabId,
}: OnboardingStepProps) {
	return (
		<View
			style={currentTab === tabId ? styles.activeCircle : styles.circle}
		></View>
	);
}

const styles = StyleSheet.create({
	circle: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: colors.primary,
	},

	activeCircle: {
		width: 25,
		height: 10,
		borderRadius: 5,
		backgroundColor: colors.primary,
	},
});
