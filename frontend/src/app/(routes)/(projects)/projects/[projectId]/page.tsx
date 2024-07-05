"use client";

import React, { useCallback, useEffect, useState } from "react";

import ProjectDetailNavbar from "./_components/project-detail-navbar";
import ProjectDetailsTopBar from "./_components/project-details-topbar";
import ProjectTasksList from "./_components/project-tasks-list";
import { Project } from "@/types/interface";
import { useAuth } from "@clerk/nextjs";
import { getProject } from "@/actions/project-actions/get-project";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
	params: {
		projectId: string;
	};
};

const ProjectDetailPage = ({ params }: Props) => {
	const [projectData, setProjectData] = useState<Project | null>(null);

	const { userId } = useAuth();

	if (!userId) {
		throw new Error("Not authorized");
	}

	const getProjectData = useCallback(async () => {
		try {
			const response = await getProject(params.projectId, userId);
			setProjectData(response);
		} catch (error) {
			console.log("PROJECT_DETAIL_CALLBACK_ERROR");
		}
	}, [params.projectId, userId]);

	useEffect(() => {
		getProjectData();
	}, [getProjectData]);

	if (projectData === null) {
		return (
			<div className="flex flex-col gap-2">
				<Skeleton className="w-52 h-4" />
				<Skeleton className="w-52 h-4" />
				<Skeleton className="w-52 h-4" />
			</div>
		);
	}

	return (
		<div className="relative w-full">
			<ProjectDetailNavbar projectData={projectData} />
			<ProjectDetailsTopBar
				projectData={projectData}
				projectId={params.projectId}
				userId={userId}
			/>
			<ProjectTasksList projectTask={projectData.tasks} />
		</div>
	);
};

export default ProjectDetailPage;
