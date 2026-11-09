import { betterAuth } from "better-auth/minimal";
import { db } from "../db/index.ts";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import * as schema from "../db/auth-schema.ts";
import { config } from "../utils/config.ts";

export const auth = betterAuth({
	basePath: `${config.API_PREFIX}/auth`,
	database: drizzleAdapter(db, { provider: "pg", schema }),
	emailAndPassword: {
		enabled: true,
	},
});
