import React from "react";
import OverallProgress from "./overall-progress";
import LatestProjects from "./latest-projects";
import { Task } from "@/types/interface";

type Props = {
	totalTasks: Task[];
};

const RightSideBar = ({ totalTasks }: Props) => {
	const totalTasksCompleted = totalTasks.filter((field: any) =>
		Boolean(field.is_completed)
	);

	const overallProgress =
		(totalTasksCompleted.length / totalTasks.length) * 100;

	return (
		<div className="lg:w-3/12 p-4 flex flex-col gap-4">
			<OverallProgress percentage={overallProgress} />
			<LatestProjects />
		</div>
	);
};

export default RightSideBar;
