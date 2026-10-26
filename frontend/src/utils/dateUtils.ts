import { randomRange } from "./random";

type FormatDateOptions = {
	locale?: string;
	options?: Intl.DateTimeFormatOptions;
};

export function formatDate(
	date: Date,
	{ locale = "en-GB", options }: FormatDateOptions = {},
) {
	return new Intl.DateTimeFormat(
		locale,
		options ?? {
			weekday: "long",
			month: "long",
			day: "numeric",
		},
	).format(date);
}

// dayKey to create for filtering logs
// so we compare strings instead of creating new dates each time.
export function getDayKey(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

export function isToday(date: Date) {
	return new Date().toDateString() === new Date(date).toDateString();
}

export function matchingDate(logged: Date, current: Date) {
	return new Date(logged).toDateString() === new Date(current).toDateString();
}

type RelativeDayLabel = "Today" | "Yesterday" | "Tomorrow";
export function getRelativeDay(dayCounter: number = 0): RelativeDayLabel {
	if (dayCounter === -1) {
		return "Tomorrow";
	}
	if (dayCounter === 1) {
		return "Yesterday";
	}

	return "Today";
}

// calculate how many days ago something was created
export function daysAgo(n: number = 0) {
	const d = new Date();
	d.setDate(d.getDate() - n);
	return d;
}

// random hours between 7 - 23
// randomized minutes between 0 - 59
export function randomTimestamp(daysAgoCount: number) {
	const date = daysAgo(daysAgoCount);
	const hours = randomRange(7, 17);
	const minutes = randomRange(0, 59);

	date.setHours(hours, minutes);
	return date;
}
