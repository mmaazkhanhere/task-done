import React from "react";
import { BiTaskX, BiTask } from "react-icons/bi";
import { FaProjectDiagram } from "react-icons/fa";

import StatisticsCard from "./statisitics-card";

type Props = {};

const statisticsData = [
	{
		title: "Total Projects",
		value: 15,
		icon: FaProjectDiagram,
	},
	{
		title: "Total Tasks",
		value: 30,
		icon: BiTaskX,
	},
	{
		title: "Tasks Completed",
		value: 3,
		icon: BiTask,
	},
];

const Statistics = (props: Props) => {
	return (
		<section className=" bg-gray-100/50 dark:bg-muted p-2 rounded-md">
			<div className="grid grid-cols-3 gap-4">
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
