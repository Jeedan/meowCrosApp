// keys for tankstack queries
// The as const preserves the literal types of the keys, rather than widening them to general string arrays.
export const queryKeys = {
	foods: ["foods"],
	feedingLogs: ["feeding-logs"],
	catProfile: ["cat-profile"],
	notifications: ["notification-settings"],
} as const;

export const endpoints = {
	foods: "foods",
	feedingLogs: "feedingLogs",
	catProfile: "catProfile",
	notifications: "notificationSettings",
} as const;

// Onboarding constants
export enum OnboardingTabs {
	ACCOUNT_TAB,
	CATPROFILE_TAB,
	NOTIFICATIONS_TAB,
}

export const ASH_PERCENTAGE_WET = 1.5;
export const ASH_PERCENTAGE_DRY = 2;
