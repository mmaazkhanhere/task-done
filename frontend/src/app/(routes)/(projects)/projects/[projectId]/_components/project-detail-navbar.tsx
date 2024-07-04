import React from "react";

import CircularProgressBar from "./circular-progress-bar";

import { FaProjectDiagram } from "react-icons/fa";
import { Project } from "@/types/interface";

import { IconBaseProps } from "react-icons";

import {
	IoAdd,
	IoAirplane,
	IoCafe,
	IoCar,
	IoFitness,
	IoFootball,
	IoGlobe,
	IoHeart,
	IoHome,
	IoLaptop,
	IoMusicalNote,
	IoBody,
	IoBusiness,
	IoSchool,
	IoBook,
	IoCode,
	IoGameController,
} from "react-icons/io5";
import { formatDate } from "@/helper/format-date";
type Props = {
	projectData: Project;
};

const ProjectDetailNavbar = ({ projectData }: Props) => {
	let icon = projectData.icon;
	let IconComponent: React.ComponentType<IconBaseProps> = FaProjectDiagram;

	switch (icon) {
		case "Personal":
			IconComponent = IoBody;
			break;
		case "Business":
			IconComponent = IoBusiness;
			break;
		case "School":
			IconComponent = IoSchool;
			break;
		case "Travel":
			IconComponent = IoAirplane;
			break;
		case "Cafe":
			IconComponent = IoCafe;
			break;
		case "Transport":
			IconComponent = IoCar;
			break;
		case "Fitness":
			IconComponent = IoFitness;
			break;
		case "Sports":
			IconComponent = IoFootball;
			break;
		case "Global":
			IconComponent = IoGlobe;
			break;
		case "Health":
			IconComponent = IoHeart;
			break;
		case "Home":
			IconComponent = IoHome;
			break;
		case "Tech":
			IconComponent = IoLaptop;
			break;
		case "Music":
			IconComponent = IoMusicalNote;
			break;
		case "Book":
			IconComponent = IoBook;
			break;
		case "Gaming":
			IconComponent = IoGameController;
		case "Code":
			IconComponent = IoCode;
			break;
	}

	const tasksCompleted = projectData.tasks.filter((task) =>
		Boolean(task.is_completed)
	).length;
	const totalTasks = projectData.tasks.length;

	const formattedDueDate = formatDate(projectData.due_date);

	return (
		<header className="sticky h-32 bg-primary w-full flex items-center justify-between py-4 px-4 md:px-8">
			<div className="flex items-center gap-4">
				{IconComponent &&
					React.createElement(IconComponent, {
						className: `w-11 h-11 bg-white text-green-500 rounded-full p-2`,
					})}

				<div className="flex flex-col items-start">
					<div className="flex items-center gap-4">
						<h1 className="text-3xl text-white font-bold">
							{projectData.title}
						</h1>
						<p className="px-2 py-1 bg-red-500 rounded-lg text-white text-sm font-semibold">
							{formattedDueDate}
						</p>
					</div>

					<p className="bg-gray-100 text-gray-600 px-3 py-1 text-sm mt-2 rounded-lg">
						{projectData.tasks.length} Tasks
					</p>
				</div>
			</div>
			<CircularProgressBar
				totalTasks={totalTasks}
				completedTasks={tasksCompleted}
			/>
		</header>
	);
};

export default ProjectDetailNavbar;
