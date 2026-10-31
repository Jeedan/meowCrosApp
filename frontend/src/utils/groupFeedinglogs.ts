import { FeedingLog } from "@shared/types/meal";
import { getDayKey, getHourKey } from "./dateUtils";

export type FeedingLogsByDay = Record<string, FeedingLog[]>;
export type FeedingLogsByHour = Record<string, FeedingLog[]>;

// create a lookup table grouped by date key
// this way we look up this table instead of filtering every render
export function groupFeedingLogByDay(
	feedingLog: FeedingLog[],
): FeedingLogsByDay {
	return feedingLog.reduce<FeedingLogsByDay>((grouped, log) => {
		const key = getDayKey(log.loggedAt);

		if (!grouped[key]) {
			grouped[key] = [];
		}
		grouped[key].push(log);
		return grouped;
	}, {});
}

export function groupFeedingByHour(
	feedingLog: FeedingLog[],
): FeedingLogsByHour {
	return feedingLog.reduce<FeedingLogsByHour>((grouped, log) => {
		// get hour
		const key = getHourKey(log.loggedAt);

		if (!grouped[key]) {
			grouped[key] = [];
		}

		grouped[key].push(log);
		return grouped;
	}, {});
}
