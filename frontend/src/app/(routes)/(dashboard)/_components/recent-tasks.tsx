import React from "react";
import RecentTaskCard from "./recent-task-card";
import { Task } from "@/types/interface";

type Props = {
	tasksData: Task[];
};

const RecentTasks = ({ tasksData }: Props) => {
	if (tasksData.length == 0) {
		return (
			<div className="p-4 rounded-md py-8 bg-gray-100/50 dark:bg-muted">
				<h2 className="font-semibold text-lg ">Recent Tasks</h2>
				<div className="flex items-center justify-center h-full w-full p-4">
					<p className="text-gray-400 text-sm">
						There are no tasks at this moment
					</p>
				</div>
			</div>
		);
	}

	const recentTasks = [...tasksData].reverse().slice(0, 2);

	return (
		<div className="p-4 rounded-md py-8 m-5 bg-gray-100/50 dark:bg-muted">
			<h2 className="font-semibold text-lg mb-4">Recent Tasks</h2>
			<div className="flex flex-col items-start gap-5">
				{recentTasks.map((task) => (
					<RecentTaskCard key={task.id} task={task} />
				))}
			</div>
		</div>
	);
};

export default RecentTasks;
