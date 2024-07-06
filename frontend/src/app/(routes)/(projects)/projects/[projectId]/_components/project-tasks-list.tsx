import React from "react";
import ProjectTaskCard from "./project-task-card";
import { Task } from "@/types/interface";

type Props = {
	taskList: Task[];
};

const ProjectTasksList = ({ taskList }: Props) => {
	if (taskList.length === 0) {
		return (
			<p className="text-gray-400 font-semibold p-4">
				No tasks created. Create a new one!
			</p>
		);
	}

	return (
		<section className="flex flex-col gap-y-2">
			{taskList.map((task) => (
				<ProjectTaskCard key={task.id} task={task} />
			))}
		</section>
	);
};

export default ProjectTasksList;
