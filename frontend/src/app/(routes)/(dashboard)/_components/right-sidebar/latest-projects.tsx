import React from "react";
import LatestProjectCard from "./latest-project-card";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/interface";

type Props = {
	projects: Project[];
};

const LatestProjects = ({ projects }: Props) => {
	console.log(projects);

	if (projects.length == 0) {
		return (
			<div className="dark:bg-muted bg-gray-100/50 p-4 flex flex-col gap-4 rounded-md py-8 items-center">
				<h2 className="font-black text-lg">Latest Projects</h2>
				<Image
					src="/assets/add-project.svg"
					alt="Add Project"
					width={70}
					height={70}
					className="opacity-40"
				/>
				<div className="flex flex-col items-center">
					<h3 className="font-semibold text-lg mb-1 text-center">
						No projects added yet
					</h3>
					<p className="text-sm text-center text-gray-400">
						Click below to add your first project
					</p>
				</div>
				<Button size="sm">New Project</Button>
			</div>
		);
	}

	return (
		<div className="dark:bg-muted bg-gray-100/50 p-4 flex flex-col gap-8 rounded-md py-8">
			<h1 className="font-black text-lg">Latest Projects</h1>
			<div className="flex flex-col gap-4">
				{projects.map((project: any) => (
					<LatestProjectCard key={project.title} project={project} />
				))}
			</div>
		</div>
	);
};

export default LatestProjects;
