import React from "react";
import LatestProjectCard from "./latest-project-card";
import { title } from "process";

type Props = {};

const projects = [
	{
		title: "Project 1",
		totalTasks: 12,
		tasksCompleted: 9,
	},
	{
		title: "Project 2",
		totalTasks: 10,
		tasksCompleted: 4,
	},
	{
		title: "Project 3",
		totalTasks: 6,
		tasksCompleted: 5,
	},
];

const LatestProjects = (props: Props) => {
	return (
		<div className="dark:bg-muted bg-gray-100/50 p-4 flex flex-col gap-8 rounded-md py-8">
			<h1 className="font-black text-lg">Latest Projects</h1>
			<div className="flex flex-col gap-4">
				{projects.map((project) => (
					<LatestProjectCard
						key={project.title}
						title={project.title}
						tasksCompleted={project.tasksCompleted}
						totalTasks={project.totalTasks}
					/>
				))}
			</div>
		</div>
	);
};

export default LatestProjects;
