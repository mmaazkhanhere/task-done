import { Task, TaskDone } from "@/types/interface";

export const getTasksCompletedByDay = (tasks: Task[]): TaskDone[] => {
	const daysOfWeek = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	const tasksCompleted: { [key: string]: number } = {
		Sunday: 0,
		Monday: 0,
		Tuesday: 0,
		Wednesday: 0,
		Thursday: 0,
		Friday: 0,
		Saturday: 0,
	};

	const getStartOfWeek = (date: Date): Date => {
		const start = new Date(date);
		const day = start.getDay();
		const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
		start.setDate(diff);
		start.setHours(0, 0, 0, 0);
		return start;
	};

	const getEndOfWeek = (date: Date): Date => {
		const end = new Date(date);
		const day = end.getDay();
		const diff = end.getDate() + (7 - day); // Adjust when day is Sunday
		end.setDate(diff);
		end.setHours(23, 59, 59, 999);
		return end;
	};

	const currentDate = new Date();
	const startWeek = getStartOfWeek(currentDate);
	const endWeek = getEndOfWeek(currentDate);

	tasks.forEach((task) => {
		if (task.completion_date !== null) {
			const completionDate = new Date(task.completion_date);

			// Check if the task was completed in the current week
			if (completionDate >= startWeek && completionDate <= endWeek) {
				const completionDay = completionDate.getDay();
				const dayName = daysOfWeek[completionDay];
				tasksCompleted[dayName]++;
			}
		}
	});

	return daysOfWeek.map((day) => ({ day, tasksDone: tasksCompleted[day] }));
};
