import * as SQLite from "expo-sqlite";

export const dbPromise = SQLite.openDatabaseAsync("meowCros.db");

export async function initializeDatabase() {
	const db = await dbPromise;

	await db.execAsync(`
		CREATE TABLE IF NOT EXISTS test_items (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL
		);
	`);
}

export async function testDatabase() {
	await initializeDatabase();
	const db = await dbPromise;

	await db.runAsync(
		"INSERT INTO test_items (name) VALUES (?)",
		"SQLite works!",
	);

	const rows = await db.getAllAsync<{ id: number; name: string }>(
		"SELECT FROM *  FROM test_items",
	);

	console.log("[SQLite test]", rows);
}
