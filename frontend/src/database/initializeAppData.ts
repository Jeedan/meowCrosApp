import { useFeedingLog, useFoodLibrary } from "@/store/store";
import { initializeDatabase } from "./database";
import { seedFeedingLogs } from "./feedingLogQueries";
import { seedFoods } from "./foodQueries";

export async function initializeAppData() {
	await initializeDatabase();

	await seedFoods();
	await seedFeedingLogs();
	await useFoodLibrary.getState().loadFoods();
	await useFeedingLog.getState().loadFeedingLogs();
	console.log("[SQLite] Data initialization complete");
}
