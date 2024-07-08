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

	tasks.forEach((task) => {
		if (task.is_completed) {
			const completionDay = new Date(task.due_date).getDay();
			const dayName = daysOfWeek[completionDay];
			tasksCompleted[dayName]++;
		}

		task.sub_tasks.forEach((subTask) => {
			if (subTask.is_completed) {
				const completionDay = new Date(subTask.due_date).getDay();
				const dayName = daysOfWeek[completionDay];
				tasksCompleted[dayName]++;
			}
		});
	});

	return daysOfWeek.map((day) => ({ day, tasksDone: tasksCompleted[day] }));
};
