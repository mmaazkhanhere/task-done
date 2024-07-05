"use client";

import React, { useCallback, useEffect, useState } from "react";
import ProjectTaskCard from "./project-task-card";
import { Task } from "@/types/interface";
import { getAllTasks } from "@/actions/task-actions/get-all-tasks";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
	projectId: string;
	userId: string;
};

const ProjectTasksList = ({ projectId, userId }: Props) => {
	/*This data fetching can be skipped because the task data also comes with the project data. I included it because I want to create a separate endpoint to fetch tasks related to project */
	const [taskList, setTaskList] = useState<Task[] | null>(null);

	const getTaskList = useCallback(async () => {
		try {
			const response = await getAllTasks(projectId, userId);
			setTaskList(response);
		} catch (error) {}
	}, [projectId, userId]);

	useEffect(() => {
		getTaskList();
	}, [getTaskList]);

	if (taskList === null) {
		return (
			<div className="flex flex-col gap-2">
				<Skeleton className="w-52 h-4" />
				<Skeleton className="w-52 h-4" />
				<Skeleton className="w-52 h-4" />
			</div>
		);
	}

	if (taskList.length === 0) {
		return (
			<p className="text-gray-400 font-semibold p-4">
				No tasks created. Create a new one!
			</p>
		);
	}

	return (
		<section className="flex flex-col gap-y-2">
			{taskList.map((task) => (
				<ProjectTaskCard key={task.id} task={task} />
			))}
		</section>
	);
};

export default ProjectTasksList;
