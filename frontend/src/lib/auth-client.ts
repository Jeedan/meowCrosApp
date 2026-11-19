import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

// Base URL of your Better Auth backend.
// example: "http://192.168.1.103:3000/api/v1/auth"
export const authClient = createAuthClient({
	baseURL: process.env.EXPO_PUBLIC_BASE_URL,
	plugins: [
		expoClient({
			scheme: process.env.EXPO_PUBLIC_SCHEME, // can find in app.json
			storagePrefix: process.env.EXPO_PUBLIC_STORAGE_PREFIX,
			storage: SecureStore,
		}),
	],
});
