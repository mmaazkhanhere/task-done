import React from "react";

import { Progress } from "@/components/ui/progress";

import { FaProjectDiagram } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { Project } from "@/types/interface";

import { IconBaseProps } from "react-icons";

import {
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
import Link from "next/link";

type Props = {
	project: Project;
};

const LatestProjectCard = ({ project }: Props) => {
	let projectIcon = project.icon;
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

	const totalTasks = project.tasks.length;
	const tasksCompleted = project.tasks.filter((field: any) =>
		Boolean(field.is_completed)
	).length;

	const progress = Math.round((tasksCompleted / totalTasks) * 100);

	return (
		<div className="flex flex-col gap-6 p-4 rounded-md bg-white dark:bg-muted-foreground/30 w-full">
			<div className="flex gap-2 items-center group">
				{IconComponent &&
					React.createElement(IconComponent, {
						className:
							"bg-primary p-1 text-white rounded-full w-5 h-5 hover:animate-pulse",
					})}

				<Link
					className=" group-hover:underline hover:font-semibold"
					href={`/projects/${project.id}`}
				>
					{project.title}
				</Link>
			</div>
			<div className="flex flex-col items-start gap-1 w-full">
				<div className="flex items-center justify-between gap-2 w-full">
					<div className="flex items-center gap-2">
						<span className="text-sm md:text-base">Progress</span>
						<FaBarsProgress />
					</div>
					<div className="flex items-center gap-2">
						<p className="text-sm md:text-base">
							<span>{tasksCompleted}</span>/{totalTasks}
						</p>
					</div>
				</div>
				<Progress value={progress} />
			</div>
		</div>
	);
};

export default LatestProjectCard;
