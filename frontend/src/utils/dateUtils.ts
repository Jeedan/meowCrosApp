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
