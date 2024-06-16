"use client";
import React, { useEffect, useState } from "react";
import {
	BarChart,
	Bar,
	Rectangle,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

interface TaskDone {
	day: string;
	tasksDone: number;
}

type Props = {};

const data: TaskDone[] = [
	{ day: "Monday", tasksDone: 20 },
	{ day: "Tuesday", tasksDone: 10 },
	{ day: "Wednesday", tasksDone: 15 },
	{ day: "Thursday", tasksDone: 25 },
	{ day: "Friday", tasksDone: 18 },
	{ day: "Saturday", tasksDone: 12 },
	{ day: "Sunday", tasksDone: 8 },
];

const ProgressBarChart = (props: Props) => {
	const [mockData, setMockData] = useState<TaskDone[]>([]);

	useEffect(() => {
		setMockData(data);
	}, []);

	return (
		<div>
			<ResponsiveContainer width={"99%"} height={500}>
				<BarChart data={mockData}>
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
