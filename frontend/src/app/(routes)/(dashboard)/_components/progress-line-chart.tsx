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

const ProgressLineChart = (props: Props) => {
	const [mockData, setMockData] = useState<TaskDone[]>([]);

	useEffect(() => {
		setMockData(data);
	}, []);

	return (
		<div className="mt-10">
			<ResponsiveContainer width={"99%"} height={400}>
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
						fill="green"
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default ProgressLineChart;
