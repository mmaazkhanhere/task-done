"use client";

import React, { useCallback, useEffect, useState } from "react";

import { Progress } from "@/components/ui/progress";

import { FaProjectDiagram } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import ProjectDropdownMenu from "./project-dropdown-menu";
import Link from "next/link";
import { Category, Project } from "@/types/interface";
import { getSpecificCategory } from "@/actions/category-actions/get-specific-category";

type Props = {
	project: Project;
	userId: string;
};

const ProjectCard = ({ project, userId }: Props) => {
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

	console.log(project);
	console.log(categoryData);

	return (
		<div className="bg-gray-100 dark:bg-muted-foreground/30 p-4 rounded-lg flex flex-col items-start w-full gap-5">
			<div className="flex items-center justify-between w-full">
				<div className="flex items-center gap-2 w-full">
					<FaProjectDiagram
						size={24}
						className="bg-primary rounded-full text-white p-1"
					/>
					<Link
						href={`/projects/${project.id}`}
						className="text-lg font-semibold hover:text-green-500 hover:underline hover:opacity-80 transition duration-300"
					>
						{project.title}
					</Link>
				</div>
				<ProjectDropdownMenu project={project} />
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
				<p className="text-gray-600 text-sm">
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
