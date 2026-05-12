import { colors, globalStyles } from "@/styles/global";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingTabs } from "@/utils/constants";
import OnboardingStep from "@/components/OnboardingStep";
import StepAccountScreen from "./StepAccountScreen";
import { AccountFormData, CatProfileFormData } from "@shared/index";
import { useRouter } from "expo-router";
import StepCatProfileScreen from "./StepCatProfileScreen";
import Button from "@/components/Button";

export default function OnboardingScreen() {
	const [currentTab, setCurrentTab] = useState(OnboardingTabs.ACCOUNT_TAB);

	const [accountData, setAccountData] = useState<AccountFormData>({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const defaultValues = {
		email: "",
	};

	const router = useRouter();

	const navTestNextTab = () => {
		if (currentTab === OnboardingTabs.ACCOUNT_TAB) {
			setCurrentTab(OnboardingTabs.CATPROFILE_TAB);
		} else if (currentTab === OnboardingTabs.CATPROFILE_TAB) {
			setCurrentTab(OnboardingTabs.NOTIFICATIONS_TAB);
		} else {
			router.replace("/dashboard");
		}
	};
	const navTestPreviousTab = () => {
		if (currentTab === OnboardingTabs.NOTIFICATIONS_TAB) {
			setCurrentTab(OnboardingTabs.CATPROFILE_TAB);
		} else if (currentTab === OnboardingTabs.CATPROFILE_TAB) {
			setCurrentTab(OnboardingTabs.ACCOUNT_TAB);
		} else {
			setCurrentTab(OnboardingTabs.ACCOUNT_TAB);
		}
	};

	const navigateTab = (tab: OnboardingTabs) => {
		setCurrentTab(tab);
	};

	const onStepCompleteAccountForm = (data: AccountFormData) => {
		setAccountData(data);
		navigateTab(OnboardingTabs.CATPROFILE_TAB);
	};

	const onStepCompleteCatProfileForm = (data: CatProfileFormData) => {
		navigateTab(OnboardingTabs.NOTIFICATIONS_TAB);
	};

	// Todo
	const onStepNotificationsForm = (data: any) => {
		router.replace("/dashboard");
	};

	const handleFormSwitch = () => {
		switch (currentTab) {
			case OnboardingTabs.ACCOUNT_TAB:
				return (
					<StepAccountScreen
						defaultValues={defaultValues}
						onStepComplete={onStepCompleteAccountForm}
					/>
				);
			case OnboardingTabs.CATPROFILE_TAB:
				return (
					<StepCatProfileScreen
						onStepComplete={onStepCompleteCatProfileForm}
						navigateTab={navigateTab}
					/>
				);
			case OnboardingTabs.NOTIFICATIONS_TAB:
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
						tabId={OnboardingTabs.ACCOUNT_TAB}
					/>
					<OnboardingStep
						currentTab={currentTab}
						tabId={OnboardingTabs.CATPROFILE_TAB}
					/>
					<OnboardingStep
						currentTab={currentTab}
						tabId={OnboardingTabs.NOTIFICATIONS_TAB}
					/>
				</View>

				{handleFormSwitch()}
			</View>

			{/* THESE BUTTONS ARE ONLY FOR TESTING NAVIGATION */}
			<View style={styles.rowContainer}>
				<Button style={styles.testButton} onPress={navTestNextTab}>
					<Text style={styles.buttonText}>Next</Text>
				</Button>

				<Button
					style={styles.testButton}
					onPress={navTestPreviousTab}
					disabled={currentTab === 0}
				>
					<Text style={styles.buttonText}>Previous</Text>
				</Button>
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
		paddingTop: 30,
		marginBottom: 8,
	},

	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	rowContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 15,
		marginBottom: 10,
	},

	buttonText: {
		color: colors.text,
		fontSize: 18,
	},

	testButton: {
		backgroundColor: colors.textSecondary,
	},
});
