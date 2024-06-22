"use client";

import React, { useState, useEffect } from "react";

type Props = {
	totalTasks: number;
	completedTasks: number;
};

const CircularProgressBar = ({ totalTasks, completedTasks }: Props) => {
	const [percentage, setPercentage] = useState(0);

	useEffect(() => {
		if (totalTasks > 0) {
			const percent = Math.round((completedTasks / totalTasks) * 100);
			setPercentage(percent);
		} else {
			setPercentage(0);
		}
	}, [totalTasks, completedTasks]);

	const radius = 50;
	const strokeWidth = 8;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (percentage / 100) * circumference;

	return (
		<svg width="120" height="120" viewBox="0 0 120 120">
			<circle
				cx="60"
				cy="60"
				r={radius}
				fill="none"
				stroke="green"
				strokeWidth={strokeWidth}
			/>
			<circle
				cx="60"
				cy="60"
				r={radius}
				fill="none"
				stroke="white" /* Change color as needed */
				strokeWidth={strokeWidth}
				strokeDasharray={circumference}
				strokeDashoffset={offset}
				strokeLinecap="round"
				style={{ transition: "stroke-dashoffset 0.3s ease-in-out" }}
			/>
			<text
				x="60"
				y="60"
				textAnchor="middle"
				dominantBaseline="middle"
				fontSize="24"
				fill="white"
			>
				{percentage}%
				<tspan x="60" dy="1.8em" fontSize="12" fill="white">
					Completed
				</tspan>
			</text>
		</svg>
	);
};

export default CircularProgressBar;
