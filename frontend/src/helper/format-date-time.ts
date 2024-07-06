import { format, isToday, isYesterday, isTomorrow } from "date-fns";

export function formatDateTime(dateString: Date) {
	const date = new Date(dateString);

	let dayPart;
	if (isToday(date)) {
		dayPart = "Today";
	} else if (isYesterday(date)) {
		dayPart = "Yesterday";
	} else if (isTomorrow(date)) {
		dayPart = "Tomorrow";
	} else {
		dayPart = format(date, "dd-MMM-yyyy");
	}

	const timePart = format(date, "h:mm a");

	return `${dayPart}, ${timePart}`;
}
