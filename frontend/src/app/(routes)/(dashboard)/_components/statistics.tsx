import React from "react";

import StatisticsCard from "./statisitics-card";

import { Task } from "@/types/interface";

import { BiTaskX, BiTask } from "react-icons/bi";
import { FaProjectDiagram } from "react-icons/fa";

type Props = {
	totalProjects: number;
	tasksData: Task[];
};

const Statistics = ({ totalProjects, tasksData }: Props) => {
	const totalTasksCompleted = tasksData.filter((field) =>
		Boolean(field.is_completed)
	);

	const statisticsData = [
		{
			title: "Total Projects",
			value: totalProjects,
			icon: FaProjectDiagram,
		},
		{
			title: "Total Tasks",
			value: tasksData.length,
			icon: BiTaskX,
		},
		{
			title: "Tasks Completed",
			value: totalTasksCompleted.length,
			icon: BiTask,
		},
	];

	return (
		<section className=" bg-gray-100/50 dark:bg-muted p-2 rounded-md order-2 md:order-1">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{statisticsData.map((data) => (
					<StatisticsCard
						key={data.title}
						title={data.title}
						value={data.value}
						icon={data.icon}
					/>
				))}
			</div>
		</section>
	);
};

export default Statistics;
