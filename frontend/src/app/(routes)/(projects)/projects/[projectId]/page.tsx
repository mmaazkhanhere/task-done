"use client";

import React, { useCallback, useEffect, useState } from "react";

import ProjectDetailNavbar from "./_components/project-detail-navbar";
import ProjectDetailsTopBar from "./_components/project-details-topbar";
import ProjectTasksList from "./_components/project-tasks-list";
import { Project, Task } from "@/types/interface";
import { useAuth } from "@clerk/nextjs";
import { getProject } from "@/actions/project-actions/get-project";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllProjectTasks } from "@/actions/project-task-actions/get-all-project-tasks";

type Props = {
	params: {
		projectId: string;
	};
};

const ProjectDetailPage = ({ params }: Props) => {
	const [projectData, setProjectData] = useState<Project | null>(null);
	const [taskList, setTaskList] = useState<Task[] | null>(null);

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

	/*This data fetching can be skipped because the task data also comes with the project data. I included it because I want to create a separate endpoint to fetch tasks related to project */
	const getTaskList = useCallback(async () => {
		try {
			const response = await getAllProjectTasks(params.projectId, userId);
			setTaskList(response);
		} catch (error) {}
	}, [params.projectId, userId]);

	useEffect(() => {
		getProjectData();
		getTaskList();
	}, [getProjectData, getTaskList]);

	if (projectData === null) {
		return (
			<div className="flex flex-col gap-2">
				<Skeleton className="w-52 h-4" />
				<Skeleton className="w-52 h-4" />
				<Skeleton className="w-52 h-4" />
			</div>
		);
	}

	if (taskList === null) {
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
			<ProjectDetailNavbar
				projectTitle={projectData.title}
				taskList={taskList}
				icon={projectData.icon}
				projectDueDate={projectData.due_date}
			/>
			<ProjectDetailsTopBar
				projectData={projectData}
				projectId={params.projectId}
				userId={userId}
				getProjectData={getProjectData}
				getTaskList={getTaskList}
			/>
			<ProjectTasksList
				userId={userId}
				taskList={taskList}
				getProjectData={getProjectData}
				getTaskList={getTaskList}
			/>
		</div>
	);
};

export default ProjectDetailPage;
