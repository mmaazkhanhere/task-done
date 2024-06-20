import React from "react";
import RecentTaskCard from "./recent-task-card";

interface RecentTasks {
	_id: number;
	taskName: string;
	createdAt: string;
	projectName: string;
	status: string;
}

const recentTasksArray: RecentTasks[] = [
	// {
	// 	_id: 1,
	// 	taskName: "Coding",
	// 	createdAt: "30 April 2024",
	// 	projectName: "Project 1",
	// 	status: "Pending",
	// },
	// {
	// 	_id: 2,
	// 	taskName: "Desiging",
	// 	createdAt: "30 April 2024",
	// 	projectName: "Project 2",
	// 	status: "Completed",
	// },
	// {
	// 	_id: 3,
	// 	taskName: "Testing",
	// 	createdAt: "1 May 2024",
	// 	projectName: "Project 1",
	// 	status: "Pending",
	// },
];
type Props = {};

const RecentTasks = (props: Props) => {
	if (recentTasksArray.length == 0) {
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

	return (
		<div className="p-4 rounded-md py-8 m-5 bg-gray-100/50 dark:bg-muted">
			<h2 className="font-semibold text-lg mb-4">Recent Tasks</h2>
			<div className="flex flex-col items-start gap-5">
				{recentTasksArray.map((task) => (
					<RecentTaskCard
						key={task._id}
						_id={task._id}
						taskName={task.taskName}
						projectName={task.projectName}
						createdAt={task.createdAt}
						status={task.status}
					/>
				))}
			</div>
		</div>
	);
};

export default RecentTasks;
