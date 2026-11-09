import "dotenv/config";
import { defineRelationsPart } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as authSchema from "./auth-schema.ts";
import { config } from "../utils/config.ts";

const pool = new Pool({
	connectionString: config.db.url!,
});

const { authRelations, ...authTables } = authSchema;

const relations = {
	...defineRelationsPart(authTables),
	...authRelations,
};

export const db = drizzle({ client: pool, relations });

export async function checkDatabaseConnection() {
	await pool.query("SELECT 1");
}
