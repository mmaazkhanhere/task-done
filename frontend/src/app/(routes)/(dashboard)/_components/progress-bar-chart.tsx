"use client";
import { getTasksCompletedByDay } from "@/helper/get-task-completed-by-day";
import { Task, TaskDone } from "@/types/interface";
import React, { useEffect, useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

type Props = {
	tasksData: Task[];
};

const ProgressBarChart = ({ tasksData }: Props) => {
	const tasksDoneData: TaskDone[] = getTasksCompletedByDay(tasksData);

	console.log(tasksDoneData);

	return (
		<div>
			<ResponsiveContainer width={"99%"} height={500}>
				<BarChart data={tasksDoneData}>
					<XAxis dataKey="day" />
					<YAxis />
					<Tooltip />
					<Legend />
					<CartesianGrid strokeDasharray="3" />
					<Bar
						type="monotone"
						dataKey="tasksDone"
						stroke="white"
						fill="#4ade80"
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ProgressBarChart;
