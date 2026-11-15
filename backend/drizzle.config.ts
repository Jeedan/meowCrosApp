import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { config } from "./src/utils/config";

// example to add multiple schemas without barrel style exports file.
// 	schema: ["./src/db/schema.ts", "./src/db/auth-schema.ts"],
export default defineConfig({
	out: "./drizzle",
	schema: "./src/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: config.db.url,
	},
});
