import { colors, globalStyles } from "@/styles/global";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	ACCOUNT_TAB,
	CATPROFILE_TAB,
	NOTIFICATIONS_TAB,
} from "@/utils/constants";
import OnboardingStep from "@/components/OnboardingStep";
import StepAccountScreen from "./StepAccountScreen";
import { AccountFormData } from "@shared/index";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
	const [currentTab, setCurrentTab] = useState(1);

	const [accountData, setAccountData] = useState<AccountFormData>({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const defaultValues = {
		email: "",
	};

	const router = useRouter();
	const navigateTabs = () => {
		if (currentTab === ACCOUNT_TAB) {
			setCurrentTab(CATPROFILE_TAB);
		} else if (currentTab === CATPROFILE_TAB) {
			setCurrentTab(NOTIFICATIONS_TAB);
		} else {
			router.replace("/dashboard");
		}
	};

	const onStepComplete = (data: AccountFormData) => {
		setAccountData(data);
		navigateTabs();
	};

	const handleFormSwitch = () => {
		switch (currentTab) {
			case ACCOUNT_TAB:
				return (
					<StepAccountScreen
						defaultValues={defaultValues}
						onStepComplete={onStepComplete}
					/>
				);
			case CATPROFILE_TAB:
				return null;
			case NOTIFICATIONS_TAB:
				return null;
			default:
				return null;
		}
	};

	return (
		<SafeAreaView style={globalStyles.scrollContainer}>
			<View style={styles.container}>
				{/* Step Indicator, 3 dots */}
				<View style={styles.circleContainer}>
					<OnboardingStep
						currentTab={currentTab}
						tabId={ACCOUNT_TAB}
					/>
					<OnboardingStep
						currentTab={currentTab}
						tabId={CATPROFILE_TAB}
					/>
					<OnboardingStep
						currentTab={currentTab}
						tabId={NOTIFICATIONS_TAB}
					/>
				</View>
				{handleFormSwitch()}
				{/* { <Pressable style={styles.button} onPress={navigateTabs}>
					<View style={styles.container}>
						<Text>Press</Text>
					</View>
				</Pressable> } */}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
	},

	circleContainer: {
		gap: 5,
		flexDirection: "row",
		paddingTop: 20,
		marginBottom: 20,
	},

	button: {
		width: 100,
		height: 100,
		borderRadius: 20,
		backgroundColor: colors.primary,
	},
});
