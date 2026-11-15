import "dotenv/config";
import { defineRelationsPart } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { config } from "../utils/config.ts";

import * as authSchema from "./auth-schema.ts";
import * as foodsSchema from "./foods-schema.ts";

const pool = new Pool({
	connectionString: config.db.url!,
});

// extract the custom authRelations export so it doesn't get treated as a database table
const { authRelations, ...authTables } = authSchema;

//tables combines my schemas and the better auth schemas to provide to drizzle
const tables = {
	...authTables,
	...foodsSchema,
};

// use the combined tables instead of just authTables to define all existing relations
const relations = {
	...defineRelationsPart(tables),
	...authRelations,
};

export const db = drizzle({ client: pool, relations });

export async function checkDatabaseConnection() {
	await pool.query("SELECT 1");
}
