import { betterAuth } from "better-auth/minimal";
import { db } from "../db/index.ts";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import * as schema from "../db/auth-schema.ts";
import { config } from "../utils/config.ts";
import { expo } from "@better-auth/expo";

export const auth = betterAuth({
	basePath: `${config.API_PREFIX}/auth`,
	database: drizzleAdapter(db, { provider: "pg", schema }),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [expo()],
	trustedOrigins: [
		"meowcrosapp://",

		// Development mode - Expo's exp:// scheme with local IP ranges
		// only use in development
		...(process.env.NODE_ENV === "development"
			? [
					"exp://", // Trust any host of the exp:// scheme
					"exp://**", // Trust all Expo URLs (wildcard matching)
					"exp://192.168.*.*:*/**", // Trust 192.168.x.x IP range with any port and path
				]
			: []),
	],
});

export type SessionType = typeof auth.$Infer.Session;
// user info because we don't need all of session info passed around
export type AuthenticatedUser = SessionType["user"];
