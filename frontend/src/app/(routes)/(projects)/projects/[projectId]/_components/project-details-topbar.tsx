"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import { IoMdAdd, IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import AddProjectTask from "./add-project-task";
import { Project } from "@/types/interface";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
	projectData: Project;
	projectId: string;
	userId: string;
	getProjectData: () => void;
};

const ProjectDetailsTopBar = ({
	projectData,
	projectId,
	userId,
	getProjectData,
}: Props) => {
	const [sortValue, setSortValue] = useState<string>("name");
	const router = useRouter();

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortValue(e.target.value);
	};

	const backNavigation = () => {
		router.push("/projects");
	};

	return (
		<div className="flex flex-col items-start justify-center w-full gap-y-10 p-4">
			<div className="flex items-center gap-4 lg:gap-6">
				<button
					onClick={backNavigation}
					className="py-1 px-2 rounded-lg border border-gray-500 bg-white dark:bg-muted"
				>
					<IoMdArrowBack className=" text-green-500 w-8 h-8 p-1" />
				</button>
				<div className="flex flex-col items-start gap-1">
					<h2 className="text-2xl font-semibold">
						Project Description
					</h2>
					<p>{projectData.description}</p>
				</div>
			</div>

			<div className="flex items-center justify-between w-full">
				<div className="flex items-center gap-x-4">
					<h2 className="text-2xl font-semibold">All Tasks</h2>
					<AddProjectTask
						projectId={projectId}
						userId={userId}
						getProjectData={getProjectData}
					/>
				</div>
				<div className="flex items-center gap-2">
					<p className="text-gray-500">Sort by:</p>
					<select
						name="sort"
						id="sort"
						value={sortValue}
						onChange={handleSortChange}
						className="text-green-500"
					>
						<option value="name">Name</option>
						<option value="date">Date</option>
						<option value="priority">Priority</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetailsTopBar;
