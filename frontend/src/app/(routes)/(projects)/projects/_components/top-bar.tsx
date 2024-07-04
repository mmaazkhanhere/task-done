import React from "react";
import ProjectCard from "./project-card";
import { Project } from "@/types/interface";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
	projectList: Project[];
	userId: string;
};

const Topbar = ({ projectList, userId }: Props) => {
	if (projectList === null) {
		return (
			<div className="flex flex-col gap-5">
				<Skeleton className="h-10 w-64" />
				<Skeleton className="h-10 w-64" />
				<Skeleton className="h-10 w-64" />
			</div>
		);
	}
	console.log(projectList);
	return (
		<div className="bg-gray-100/50 dark:bg-muted m-4 p-4 md:p-6 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-3xl gap-4 ">
			{projectList.map((project) => (
				<ProjectCard
					key={project.id}
					project={project}
					userId={userId}
				/>
			))}
		</div>
	);
};

export default Topbar;
