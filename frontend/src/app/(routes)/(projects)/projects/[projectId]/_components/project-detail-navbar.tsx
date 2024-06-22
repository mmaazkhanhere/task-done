import React from "react";

import CircularProgressBar from "./circular-progress-bar";

import { FaProjectDiagram } from "react-icons/fa";

type Props = {};

const ProjectDetailNavbar = (props: Props) => {
	return (
		<header className="sticky h-32 bg-primary w-full flex items-center justify-between py-4 px-4 md:px-8">
			<div className="flex items-center gap-4">
				<FaProjectDiagram className="w-11 h-11 bg-white text-green-500 p-2 rounded-full" />
				<div className="flex flex-col items-start">
					<h1 className="text-2xl text-white font-bold">Project 1</h1>
					<p className="text-gray-100 text-sm">3 Tasks</p>
				</div>
			</div>
			<CircularProgressBar totalTasks={5} completedTasks={4} />
		</header>
	);
};

export default ProjectDetailNavbar;
