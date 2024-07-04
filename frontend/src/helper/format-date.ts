import { format, isToday, isYesterday, isTomorrow } from "date-fns";

export function formatDate(date: Date) {
	const parsedDate = new Date(date);

	if (isToday(parsedDate)) {
		return "Today";
	} else if (isYesterday(parsedDate)) {
		return "Yesterday";
	} else if (isTomorrow(parsedDate)) {
		return "Tomorrow";
	} else {
		return format(parsedDate, "dd-MMM-yyyy");
	}
}
