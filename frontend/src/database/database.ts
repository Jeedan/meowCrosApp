import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";

//export const dbPromise = await SQLite.openDatabaseAsync("meowcros.db");

// TODO: Remove until offline mode and syncing with DB.
// DRIZZLE SETUP
export const dbPromise = SQLite.openDatabaseSync("meowcrosDrizzle.db");

// Enable foreign-key enforcement on this connection
dbPromise.execSync("PRAGMA foreign_keys = ON;");

export const db = drizzle(dbPromise);
