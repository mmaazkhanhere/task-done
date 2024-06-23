import React from "react";
import ProjectTaskCard from "./project-task-card";

type Props = {};

const projectTask = [
	{
		id: 1,
		title: "Task 1",
		priority: "Low",
		isCompleted: false,
		subTasks: [
			{
				title: "Subtask 1",
				priority: "Medium",
				isCompleted: true,
			},
			{
				title: "Subtask 2",
				priority: "Low",
				isCompleted: false,
			},
		],
	},
	{
		id: 2,
		title: "Task 2",
		priority: "High",
		isCompleted: true,
		subTasks: [],
	},
	{
		id: 3,
		title: "Task 3",
		priority: "Medium",
		isCompleted: false,
		subTasks: [
			{
				title: "Subtask 1",
				priority: "High",
				isCompleted: true,
			},
		],
	},
];

const ProjectTasksList = (props: Props) => {
	return (
		<section className="flex flex-col gap-y-2">
			{projectTask.map((task) => (
				<ProjectTaskCard
					key={task.id}
					title={task.title}
					priority={task.priority}
					isCompleted={task.isCompleted}
					subTasks={task.subTasks}
				/>
			))}
		</section>
	);
};

export default ProjectTasksList;
