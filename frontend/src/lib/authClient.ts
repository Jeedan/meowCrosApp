import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
	baseURL: "http://localhost:3000", // Base URL of your Better Auth backend.
	plugins: [
		expoClient({
			scheme: "meowcrosapp", // can find in app.json
			storagePrefix: "meowcrosapp",
			storage: SecureStore,
		}),
	],
});
