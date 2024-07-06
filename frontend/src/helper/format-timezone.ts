export function formatTimezone(date: Date) {
	// Calculate timezone offset
	const timezoneOffsetMinutes = date.getTimezoneOffset();
	const timezoneOffsetMilliseconds = timezoneOffsetMinutes * 60 * 1000;

	// Apply timezone offset to get local time
	const localTime = new Date(date.getTime() - timezoneOffsetMilliseconds);

	return localTime;
}
