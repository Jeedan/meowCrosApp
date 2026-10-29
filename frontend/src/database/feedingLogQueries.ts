import { dbPromise } from "@/database/database";
import { FeedingLog, PlateItem } from "@shared/types/meal";

export async function insertFeedingLog(log: FeedingLog) {
	const db = await dbPromise;

	await db.withTransactionAsync(async () => {
		await db.runAsync(
			"INSERT INTO feeding_logs (id, userId, loggedAt) VALUES(?, ?, ?)",
			log.id,
			log.userId,
			log.loggedAt.toISOString(),
		);

		for (const item of log.plate) {
			await db.runAsync(
				`INSERT INTO plate_items (id, feedingLogId, foodId, foodType, foodNameSnapshot, proteinPCT, fatPCT, fiberPCT, moisturePCT, ashPCT, gramsServed, kcalCalculated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
				item.id,
				log.id,
				item.foodId,
				item.foodType,
				item.foodNameSnapshot,
				item.proteinPCT,
				item.fatPCT,
				item.fiberPCT,
				item.moisturePCT,
				item.ashPCT ?? null,
				item.gramsServed,
				item.kcalCalculated,
			);
		}
	});
}
// reconstruct the nested plate array and converts loggedAt back to a Date.
export async function getFeedingLogs(): Promise<FeedingLog[]> {
	const db = await dbPromise;

	const logs = await db.getAllAsync<{
		id: string;
		userId: string;
		loggedAt: string;
	}>("SELECT * FROM feeding_logs ORDER BY loggedAt DESC");

	const items = await db.getAllAsync<{
		id: string;
		feedingLogId: string;
		foodId: string;
		foodType: "wet" | "dry";
		foodNameSnapshot: string;
		proteinPCT: number;
		fatPCT: number;
		fiberPCT: number;
		moisturePCT: number;
		ashPCT: number | null;
		gramsServed: number;
		kcalCalculated: number;
	}>("SELECT * FROM plate_items");

	return logs.map((log) => {
		const plate: PlateItem[] = items
			.filter((item) => item.feedingLogId === log.id)
			.map(({ feedingLogId: _feedingLogId, ashPCT, ...item }) => ({
				...item,
				ashPCT: ashPCT ?? undefined,
			}));

		return {
			id: log.id,
			userId: log.userId,
			loggedAt: new Date(log.loggedAt),
			plate,
		};
	});
}

// Deleting a log: the ON DELETE CASCADE rule in your schema removes its plate items too.
// Food deletion: foodId deliberately has no foreign key to foods, so historical plate items remain intact.
export async function deleteFeedingLog(id: string) {
	const db = await dbPromise;

	await db.runAsync("DELETE FROM feeding_logs WHERE id = ?", id);
}

//removes the whole feeding log if its last plate item is deleted.
export async function deletePlateItem(
	feedingLogId: string,
	plateItemId: string,
) {
	const db = await dbPromise;

	db.withTransactionAsync(async () => {
		await db.runAsync(
			"DELETE FROM plate_items WHERE id = ? AND feedingLogId = ?",
			plateItemId,
			feedingLogId,
		);

		const remaining = await db.getFirstAsync<{ count: number }>(
			"SELECT COUNT(*) AS count FROM plate_items WHERE feedinglogId = ?",
			feedingLogId,
		);

		// delete the log if we don't have plate items to not clutter the db
		if (remaining?.count === 0) {
			await db.runAsync(
				"DELETE FROM feeding_logs WHERE id = ?",
				feedingLogId,
			);
		}
	});
}
