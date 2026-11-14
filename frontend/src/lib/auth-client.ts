import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
	baseURL: "http://192.168.1.103:3000/api/v1/auth", // Base URL of your Better Auth backend.
	plugins: [
		expoClient({
			scheme: "meowcrosapp", // can find in app.json
			storagePrefix: "meowcrosapp",
			storage: SecureStore,
		}),
	],
});
