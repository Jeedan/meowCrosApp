import { useFeedingLog, useFoodLibrary } from "@/store/store";
import { deleteAllFeedingLogs, seedFeedingLogs } from "./feedingLogQueries";
import { deleteAllFoods, seedFoods } from "./foodQueries";

// import { initializeDatabase } from "./database";
// export async function initializeAppData_deprecated() {
// 	//await initializeDatabase();
// 	// await seedFoods_deprecated();
// 	// await seedFeedingLogs_deprecated();
// 	await useFoodLibrary.getState().loadFoods();
// 	await useFeedingLog.getState().loadFeedingLogs();
// 	console.log("[SQLite] Data initialization complete");
// }

export async function initializeAppData() {
	// seed foods and feedinglogs
	// load foods and feedinglogs
	await seedFoods();
	await seedFeedingLogs();
	await useFoodLibrary.getState().loadFoods();
	await useFeedingLog.getState().loadFeedingLogs();
	console.log("[Drizzle SQLite] Data initialization complete");
}

export async function resetData() {
	await deleteAllFoods();
	await deleteAllFeedingLogs();
	console.log("[Drizzle SQLite] Data reset");
}
