import { db, dbPromise } from "@/database/database";
import { FeedingLog, PlateItem } from "@shared/types/meal";
import { feedingLog as dummyFeedingLogs } from "@/data/dummy";
import { feedingLogs, plateItems } from "./schema";
import { and, asc, count, eq } from "drizzle-orm";

// TODO: after authentication, only add feedinglog to the user with correct ID
// so after .where(eq(userId, id))
// or some form of isAuthorized flag
export async function insertFeedingLog(log: FeedingLog) {
	const now = new Date().toISOString();

	await db.transaction(async (tx) => {
		tx.insert(feedingLogs)
			.values({
				id: log.id,
				userId: log.userId,
				loggedAt: log.loggedAt.toISOString(),
				created_at: now,
				updated_at: now,
			})
			.run();

		// bulk insert using map instead of looping over all plateItems
		// calling insert for each one
		// this uses one query instead
		tx.insert(plateItems)
			.values(
				log.plate.map((item) => ({
					id: item.id,
					feedingLogId: log.id,
					foodId: item.foodId,
					foodType: item.foodType,
					foodNameSnapshot: item.foodNameSnapshot,
					proteinPCT: item.proteinPCT,
					fatPCT: item.fatPCT,
					fiberPCT: item.fiberPCT,
					moisturePCT: item.moisturePCT,
					ashPCT: item.ashPCT ?? null,
					gramsServed: item.gramsServed,
					kcalCalculated: item.kcalCalculated,
					created_at: now,
					updated_at: now,
				})),
			)
			.run();
	});
}

// TODO: authentication update, check for user Id and only retrieve the log by the correct user if it exists
export async function getFeedingLogs(): Promise<FeedingLog[]> {
	const withLeftJoin = await db
		.select({ log: feedingLogs, plate: plateItems })
		.from(feedingLogs)
		.leftJoin(plateItems, eq(feedingLogs.id, plateItems.feedingLogId))
		.orderBy(asc(feedingLogs.loggedAt));

	const logsById = new Map<string, FeedingLog>();

	for (const rows of withLeftJoin) {
		if (!logsById.has(rows.log.id)) {
			const emptyLog: FeedingLog = {
				id: rows.log.id,
				userId: rows.log.userId,
				loggedAt: new Date(rows.log.loggedAt),
				plate: [],
			};
			logsById.set(emptyLog.id, emptyLog);
		}

		const log = logsById.get(rows.log.id);
		if (log && rows.plate) {
			// destructure the fields my PlateItem type doesn't have
			const {
				feedingLogId: _feedingLogId,
				created_at: _createdAt,
				updated_at: _updatedAt,
				ashPCT,
				...item
			} = rows.plate;

			log.plate.push({
				...item,
				ashPCT: rows.plate.ashPCT ?? undefined,
			});
		}
	}

	const joinResult = Array.from(logsById.values());

	return joinResult;
}

export async function deleteFeedingLog(id: string) {
	await db.delete(feedingLogs).where(eq(feedingLogs.id, id));
}

export async function deletePlateItem(
	feedingLogId: string,
	plateItemId: string,
) {
	await db.transaction((tx) => {
		tx.delete(plateItems)
			.where(
				and(
					eq(plateItems.id, plateItemId),
					eq(plateItems.feedingLogId, feedingLogId),
				),
			)
			.run();

		const result = tx
			.select({ remaining: count() })
			.from(plateItems)
			.where(eq(plateItems.feedingLogId, feedingLogId))
			.get();

		if (result?.remaining === 0) {
			tx.delete(feedingLogs)
				.where(eq(feedingLogs.id, feedingLogId))
				.run();
		}
	});
}

export async function deleteAllFeedingLogs() {
	const result = await db.delete(feedingLogs).returning();

	console.log("All FeedingLogs deleted");
	return result;
}

export async function seedFeedingLogs() {
	const result = await db.$count(feedingLogs);

	if (result > 0) {
		return;
	}

	for (const log of dummyFeedingLogs) {
		await insertFeedingLog(log);
	}
}
// ** ========== ** ========== ** ========== **
// ** ========== ** DEPRECATED ** ========== **
// ** ========== ** ========== ** ========== **
export async function insertFeedingLog_deprecated(log: FeedingLog) {
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
export async function getFeedingLogs_deprecated(): Promise<FeedingLog[]> {
	const db = await dbPromise;

	const logs = await db.getAllAsync<{
		id: string;
		userId: string;
		loggedAt: string;
	}>("SELECT * FROM feeding_logs ORDER BY loggedAt ASC");

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

// Delete all
export async function deleteAllFeedingLogs_deprecated() {
	const db = await dbPromise;
	await db.runAsync("DELETE FROM feeding_logs");
}

// Deleting a log: the ON DELETE CASCADE rule in your schema removes its plate items too.
// Food deletion: foodId deliberately has no foreign key to foods, so historical plate items remain intact.
export async function deleteFeedingLog_deprecated(id: string) {
	const db = await dbPromise;

	await db.runAsync("DELETE FROM feeding_logs WHERE id = ?", id);
}

//removes the whole feeding log if its last plate item is deleted.
export async function deletePlateItem_deprecated(
	feedingLogId: string,
	plateItemId: string,
) {
	const db = await dbPromise;

	await db.withTransactionAsync(async () => {
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

export async function seedFeedingLogs_deprecated() {
	const db = await dbPromise;
	const result = await db.getFirstAsync<{ count: number }>(
		"SELECT COUNT(*) AS count FROM feeding_logs",
	);

	if (result && result.count > 0) {
		return;
	}

	for (const log of dummyFeedingLogs) {
		await insertFeedingLog_deprecated(log);
	}

	console.log(`[SQLite] Seeded ${dummyFeedingLogs.length} feeding logs`);
}

// development reset feedinglogs
export async function resetFeedingLogs_deprecated() {
	await deleteAllFeedingLogs_deprecated();
	await seedFeedingLogs_deprecated();
}
