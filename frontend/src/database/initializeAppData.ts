import { useFeedingLog, useFoodLibrary } from "@/store/store";
// import { initializeDatabase } from "./database";
import {
	resetFeedingLogs,
	seedFeedingLogs,
	seedFeedingLogs_deprecated,
} from "./feedingLogQueries";
import { getFoods, seedFoods } from "./foodQueries";

export async function initializeAppData_deprecated() {
	//await initializeDatabase();
	// await seedFoods_deprecated();
	await seedFeedingLogs_deprecated();
	await useFoodLibrary.getState().loadFoods();
	await useFeedingLog.getState().loadFeedingLogs();
	console.log("[SQLite] Data initialization complete");
}

export async function initializeAppData() {
	// seed foods and feedinglogs
	// load foods and feedinglogs
	await seedFoods();
	await seedFeedingLogs();
	//await seedFeedingLogs();
	await useFoodLibrary.getState().loadFoods();
	await useFeedingLog.getState().loadFeedingLogs();
	console.log("[Drizzle SQLite] Data initialization complete");
}
