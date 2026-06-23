type FormatDateOptions = {
	locale?: string;
	options?: Intl.DateTimeFormatOptions;
};

export function formatDate(
	date: Date,
	{ locale = "en-US", options }: FormatDateOptions = {},
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

export function isToday(date: Date) {
	return new Date().toDateString() === new Date(date).toDateString();
}

// calculate how many days ago something was created
export function daysAgo(n: number = 0) {
	const d = new Date();
	d.setDate(d.getDate() - n);
	return d;
}

// random hours between 7 - 23
// Math.floor(Math.random()* (max-min + 1)) + min
// randomized minutes between 0 - 59
export function randomTimestamp(daysAgoCount: number) {
	const date = daysAgo(daysAgoCount);
	const hours = Math.floor(Math.random() * 17) + 7;
	const minutes = Math.floor(Math.random() * 59);

	date.setHours(hours, minutes);
	return date;
}
