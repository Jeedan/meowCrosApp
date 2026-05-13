import { colors, globalStyles } from "@/styles/global";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardingTabs } from "@/utils/constants";
import OnboardingStep from "@/components/OnboardingStep";
import StepAccountScreen from "./StepAccountScreen";
import {
	AccountFormData,
	CatProfileFormData,
	NotificationFormOutput,
} from "@shared/index";
import { useRouter } from "expo-router";
import StepCatProfileScreen from "./StepCatProfileScreen";
import Button from "@/components/Button";
import StepNotificationsScreen from "./StepNotificationsScreen";

export default function OnboardingScreen() {
	const [currentTab, setCurrentTab] = useState(OnboardingTabs.ACCOUNT_TAB);

	const [accountData, setAccountData] = useState<AccountFormData>({
		email: "",
		password: "",
		confirmPassword: "",
	});

	const router = useRouter();

	const navigateTab = (tab: OnboardingTabs) => {
		setCurrentTab(tab);
	};

	const onStepCompleteAccountForm = (data: AccountFormData) => {
		setAccountData(data);
		navigateTab(OnboardingTabs.CATPROFILE_TAB);
	};

	// Todo store cat data
	const onStepCompleteCatProfileForm = (data: CatProfileFormData) => {
		navigateTab(OnboardingTabs.NOTIFICATIONS_TAB);
	};

	// Todo store notifications data
	const onStepCompleteNotificationsForm = (data: NotificationFormOutput) => {
		console.log("reminders set");
		console.log(`startTime: ${data.startTime}`);
		console.log(`endTime: ${data.endTime}`);
		console.log(`interval: ${data.intervalMinutes}`);
		router.replace("/dashboard");
	};

	const onSkipNotificationsForm = () => {
		const withDefaults: NotificationFormOutput = {
			startTime: "07:00",
			endTime: "23:59",
			intervalMinutes: 300,
		};

		console.log("skipping notification with defaults");
		onStepCompleteNotificationsForm(withDefaults);
	};

	const handleFormSwitch = () => {
		switch (currentTab) {
			case OnboardingTabs.ACCOUNT_TAB:
				return (
					<StepAccountScreen
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
				return (
					<>
						<StepNotificationsScreen
							onStepComplete={onStepCompleteNotificationsForm}
							navigateTab={navigateTab}
						/>
						<View style={styles.skipButtonContainer}>
							<Button
								accessibilityLabel="Skip"
								onPress={onSkipNotificationsForm}
								style={styles.skipButton}
							>
								<Text style={styles.buttonText}>
									Skip Notifications
								</Text>
							</Button>
						</View>
					</>
				);
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

	skipButtonContainer: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},

	skipButton: {
		backgroundColor: colors.secondary,
	},

	buttonText: {
		color: colors.text,
		fontSize: 18,
	},
});
