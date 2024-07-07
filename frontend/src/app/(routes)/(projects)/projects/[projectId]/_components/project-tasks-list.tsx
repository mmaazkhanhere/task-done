import React from "react";
import ProjectTaskCard from "./project-task-card";
import { Task } from "@/types/interface";

type Props = {
	userId: string;
	taskList: Task[];
	getProjectData: () => void;
	getTaskList: () => void;
};

const ProjectTasksList = ({
	taskList,
	userId,
	getProjectData,
	getTaskList,
}: Props) => {
	if (taskList.length === 0) {
		return (
			<p className="text-gray-400 font-semibold p-4">
				No tasks created. Create a new one!
			</p>
		);
	}

	return (
		<section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
			{taskList.map((task) => (
				<ProjectTaskCard
					key={task.id}
					task={task}
					userId={userId}
					getProjectData={getProjectData}
					getTaskList={getTaskList}
				/>
			))}
		</section>
	);
};

export default ProjectTasksList;
