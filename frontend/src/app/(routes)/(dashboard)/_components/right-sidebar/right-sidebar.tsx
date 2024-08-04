import React from "react";
import OverallProgress from "./overall-progress";
import LatestProjects from "./latest-projects";
import { Project, Task } from "@/types/interface";

type Props = {
	totalTasks: Task[];
	allProjects: Project[];
};

const RightSideBar = ({ totalTasks, allProjects }: Props) => {
	const totalTasksCompleted = totalTasks.filter((field: any) =>
		Boolean(field.is_completed)
	);

	const overallProgress =
		(totalTasksCompleted.length / totalTasks.length) * 100;

	return (
		<div className="lg:w-3/12 p-4 flex flex-col gap-4">
			<OverallProgress percentage={overallProgress} />
			<LatestProjects projects={allProjects} />
		</div>
	);
};

export default RightSideBar;
