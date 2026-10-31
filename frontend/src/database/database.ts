import * as SQLite from "expo-sqlite";

export const dbPromise = SQLite.openDatabaseAsync("meowcros.db");

// TODO:
// create users
// create cat_profiles
// create notification_reminders
export async function initializeDatabase() {
	const db = await dbPromise;

	// Enable foreign-key enforcement for this connection.
	await db.execAsync("PRAGMA foreign_keys = ON;");
	await db.execAsync(`
		CREATE TABLE IF NOT EXISTS foods (
			id TEXT PRIMARY KEY NOT NULL,
			name TEXT NOT NULL,
			brand TEXT NOT NULL,
			foodType TEXT NOT NULL CHECK (foodType IN ('wet', 'dry')),
			proteinPCT REAL NOT NULL,
			fatPCT REAL NOT NULL,
			fiberPCT REAL NOT NULL,
			moisturePCT REAL NOT NULL,
			ashPCT REAL,
			servingSizeG REAL NOT NULL,
			lastUsedAt TEXT NOT NULL,
			created_at TEXT NOT NULL,
			updated_at TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS feeding_logs (
			id TEXT PRIMARY KEY NOT NULL,
			userId TEXT NOT NULL,
			loggedAt TEXT NOT NULL
		);

		CREATE TABLE IF NOT EXISTS plate_items (
			id TEXT PRIMARY KEY NOT NULL,
			feedingLogId TEXT NOT NULL,
			foodId TEXT NOT NULL,
			foodType TEXT NOT NULL CHECK (foodType IN ('wet', 'dry')),
			foodNameSnapshot TEXT NOT NULL,
			proteinPCT REAL NOT NULL,
			fatPCT REAL NOT NULL,
			fiberPCT REAL NOT NULL,
			moisturePCT REAL NOT NULL,
			ashPCT REAL,
			gramsServed REAL NOT NULL,
			kcalCalculated REAL NOT NULL,

			FOREIGN KEY (feedingLogId)
				REFERENCES feeding_logs(id)
				ON DELETE CASCADE
		);

		CREATE INDEX IF NOT EXISTS idx_plate_items_feedingLogId
			ON plate_items(feedingLogId);
	`);
	// test table
	// await db.execAsync(`
	// 	CREATE TABLE IF NOT EXISTS test_items (
	// 		id INTEGER PRIMARY KEY AUTOINCREMENT,
	// 		name TEXT NOT NULL
	// 	);
	// `);
}

// export async function testDatabase() {
// 	await initializeDatabase();
// 	const db = await dbPromise;

// 	await db.runAsync(
// 		"INSERT INTO test_items (name) VALUES (?)",
// 		"SQLite works!",
// 	);

// 	const rows = await db.getAllAsync<{ id: number; name: string }>(
// 		"SELECT FROM * FROM test_items",
// 	);

// 	console.log("[SQLite test]", rows);
// }
