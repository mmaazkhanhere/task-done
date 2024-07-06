import React from "react";

import CircularProgressBar from "./circular-progress-bar";

import { FaProjectDiagram } from "react-icons/fa";
import { Project, Task } from "@/types/interface";

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
import { cn } from "@/lib/utils";
type Props = {
	icon: string;
	projectTitle: string;
	projectDueDate: Date;
	taskList: Task[];
};

const ProjectDetailNavbar = ({
	projectTitle,
	taskList,
	icon,
	projectDueDate,
}: Props) => {
	let projectIcon = icon;
	let IconComponent: React.ComponentType<IconBaseProps> = FaProjectDiagram;

	switch (projectIcon) {
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

	const tasksCompleted = taskList.filter((task) =>
		Boolean(task.is_completed)
	).length;

	const totalTasks = taskList.length;

	const currentTime: Date = new Date();

	const overdue: boolean = currentTime > new Date(projectDueDate);

	const formattedDueDate = formatDate(projectDueDate);

	return (
		<header
			className={cn(
				"sticky h-32 w-full flex items-center justify-between py-4 px-4 md:px-8",
				overdue ? "bg-destructive" : "bg-primary"
			)}
		>
			<div className="flex items-center gap-4">
				{IconComponent &&
					React.createElement(IconComponent, {
						className: cn(
							`w-11 h-11  bg-white rounded-full p-2`,
							overdue ? "text-red-500" : "text-green-500"
						),
					})}

				<div className="flex flex-col items-start">
					<div className="flex items-center gap-4">
						<h1 className="text-3xl text-white font-bold">
							{projectTitle}
						</h1>
						<p
							className={cn(
								"px-2 py-1 rounded-lg text-sm font-semibold",
								overdue
									? "bg-white text-black"
									: "bg-red-500 text-white"
							)}
						>
							{formattedDueDate}
						</p>
					</div>

					<p className="bg-gray-100 text-gray-600 px-3 py-1 text-sm mt-2 rounded-lg">
						{taskList.length} Tasks
					</p>
				</div>
			</div>
			<CircularProgressBar
				totalTasks={totalTasks}
				completedTasks={tasksCompleted}
				overdue={overdue}
			/>
		</header>
	);
};

export default ProjectDetailNavbar;
