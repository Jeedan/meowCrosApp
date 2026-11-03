import { useFeedingLog, useFoodLibrary } from "@/store/store";
// import { initializeDatabase } from "./database";
import { seedFeedingLogs } from "./feedingLogQueries";
import { getFoods, seedFoods } from "./foodQueries";

export async function initializeAppData_deprecated() {
	//await initializeDatabase();
	// await seedFoods_deprecated();
	await seedFeedingLogs();
	await useFoodLibrary.getState().loadFoods();
	await useFeedingLog.getState().loadFeedingLogs();
	console.log("[SQLite] Data initialization complete");
}

export async function initializeAppData() {
	// seed foods
	await seedFoods();
	// seed feedinglogs

	// load foods
	await useFoodLibrary.getState().loadFoods();
	// load feedinglogs
}
