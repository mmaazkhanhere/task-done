"use client";

import React, { useCallback, useEffect, useState } from "react";

import { Progress } from "@/components/ui/progress";

import { FaProjectDiagram } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import ProjectDropdownMenu from "./project-dropdown-menu";
import Link from "next/link";
import { Category, Project } from "@/types/interface";
import { getSpecificCategory } from "@/actions/category-actions/get-specific-category";

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
	project: Project;
	fetchProjectList: () => void;
	userId: string;
};

const ProjectCard = ({ project, fetchProjectList, userId }: Props) => {
	const [categoryData, setCategoryData] = useState<Category | null>(null);

	const getCategoryData = useCallback(async () => {
		const response = await getSpecificCategory(
			project.category_id,
			userId as string
		);
		setCategoryData(response);
	}, [project.category_id, userId]);

	useEffect(() => {
		getCategoryData();
	}, [getCategoryData]);

	const tasksCompleted = project.tasks.filter((task) =>
		Boolean(task.is_completed)
	).length;
	const totalTasks = project.tasks.length;

	const progress = (tasksCompleted / totalTasks) * 100;

	const formattedDueDate = formatDate(project.due_date);

	let icon = project.icon;
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

	console.log(project);

	return (
		<div className="bg-gray-100 dark:bg-muted-foreground/30 p-4 rounded-lg flex flex-col items-start w-full gap-5">
			<div className="flex items-center justify-between w-full">
				<div className="flex items-center gap-2 w-full">
					{IconComponent &&
						React.createElement(IconComponent, {
							size: 28,
							className: `bg-primary roundeed-full text-white p-1 rounded-lg`,
						})}

					<Link
						href={`/projects/${project.id}`}
						className="text-lg font-semibold hover:text-green-500 hover:underline hover:opacity-80 transition duration-300"
					>
						{project.title}
					</Link>
				</div>
				<ProjectDropdownMenu
					userId={userId}
					project={project}
					fetchProjectList={fetchProjectList}
				/>
			</div>

			<div className="flex flex-col gap-1">
				<p className="text-sm text-gray-400">
					Due Date:{" "}
					<span className="text-red-500 font-semibold">
						{formattedDueDate}
					</span>
				</p>
				<p className="text-sm text-gray-500">{project.description}</p>
			</div>

			{totalTasks > 0 ? (
				<div className="flex flex-col items-start w-full gap-2">
					<div className="flex items-center justify-between w-full">
						<div className="text-sm md:text-base flex items-center gap-2">
							<FaBarsProgress className="w-4 md:w-5 h-4 md:h-5 text-gray-500" />
							Progress
						</div>

						<p className="text-sm md:text-base">
							{tasksCompleted}/{totalTasks}
						</p>
					</div>
					<Progress value={progress} />
				</div>
			) : (
				<p className="text-gray-600 text-sm font-medium">
					No tasks created yet. Create new one
				</p>
			)}

			<p className="bg-primary text-white rounded-lg px-4 md:px-6 py-1 text-xs md:text-sm">
				{categoryData?.title}
			</p>
		</div>
	);
};

export default ProjectCard;
