import {
	differenceInSeconds,
	differenceInMinutes,
	differenceInHours,
	differenceInDays,
	differenceInWeeks,
} from "date-fns";

export const calculateTimeLeft = (dueDate: Date) => {
	const now = new Date();
	const due = new Date(dueDate);

	const weeks = differenceInWeeks(due, now);
	const days = differenceInDays(due, now) % 7;
	const hours = differenceInHours(due, now) % 24;
	const minutes = differenceInMinutes(due, now) % 60;
	const seconds = differenceInSeconds(due, now) % 60;

	let formattedTime = "";

	if (weeks > 0) {
		formattedTime += `${weeks} week${weeks > 1 ? "s" : ""} `;
	}
	if (days > 0) {
		formattedTime += `${days} day${days > 1 ? "s" : ""} `;
	}
	if (hours > 0) {
		formattedTime += `${hours} hour${hours > 1 ? "s" : ""} `;
	}
	if (minutes > 0) {
		formattedTime += `${minutes} min${minutes > 1 ? "s" : ""} `;
	}
	if (seconds > 0) {
		formattedTime += `${seconds} sec`;
	}

	return formattedTime.trim();
};
