import React from "react";

import ProjectCard from "./project-card";

import { Skeleton } from "@/components/ui/skeleton";

import { Project } from "@/types/interface";

type Props = {
	projectList: Project[];
	fetchProjectList: () => void;
	userId: string;
};

const ProjectList = ({ projectList, fetchProjectList, userId }: Props) => {
	if (projectList === null) {
		return (
			<div className="flex flex-col gap-5 mt-8 m-4 p-4 md:p-6">
				<div className="w-24 h-24 rounded-full bg-slate-100" />
				<Skeleton className="h-10 w-full md:w-[650px] bg-gray-100" />
				<Skeleton className="h-10 w-full md:w-[650px] bg-gray-100" />
				<Skeleton className="h-10 w-full md:w-[650px] bg-gray-100" />
			</div>
		);
	}

	return (
		<div className="bg-gray-100/50 dark:bg-muted m-4 p-4 md:p-6 mt-8 grid grid-cols-1 lg:grid-cols-2  rounded-3xl gap-4 ">
			{projectList.map((project) => (
				<ProjectCard
					key={project.id}
					project={project}
					userId={userId}
					fetchProjectList={fetchProjectList}
				/>
			))}
		</div>
	);
};

export default ProjectList;
