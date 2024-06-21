import React from "react";
import ProjectCard from "./project-card";

type Props = {};

const projectList = [
	{
		id: 1,
		title: "Project 1",
		totalTasks: 12,
		tasksCompleted: 9,
		category: ["Study", "Exam"],
	},
	{
		id: 2,
		title: "Project 2",
		totalTasks: 10,
		tasksCompleted: 4,
		category: ["Home"],
	},
	{
		id: 3,
		title: "Project 3",
		totalTasks: 5,
		tasksCompleted: 1,
		category: ["School", "Science", "Homework"],
	},
];

const Topbar = (props: Props) => {
	return (
		<div className="bg-gray-100/50 dark:bg-muted p-4 md:p-0 pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-3xl gap-4 ">
			{projectList.map((project) => (
				<ProjectCard
					key={project.id}
					title={project.title}
					tasksCompleted={project.tasksCompleted}
					totalTasks={project.totalTasks}
					category={project.category}
				/>
			))}
		</div>
	);
};

export default Topbar;
