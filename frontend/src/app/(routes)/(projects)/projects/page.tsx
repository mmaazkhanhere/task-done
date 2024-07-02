"use client";

import React, { useCallback, useEffect, useState } from "react";
import ProjectNavbar from "./_components/project-navbar";
import Topbar from "./_components/top-bar";
import { Project } from "@/types/interface";
import { useAuth } from "@clerk/nextjs";
import { getAllProject } from "@/actions/project-actions/get-all-project";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const Projects = (props: Props) => {
	const { userId } = useAuth();

	const [projectList, setProjectList] = useState<Project[] | null>(null);

	const fetchProjectList = useCallback(async () => {
		try {
			const response = await getAllProject(userId as string);
			setProjectList(response);
		} catch (error) {
			console.error(`[FETCH_PRJECT_LIST_CALLBACK_ERROR]: `, error);
		}
	}, [userId]);

	useEffect(() => {
		fetchProjectList();
	}, [fetchProjectList]);

	if (projectList === null) {
		return <Skeleton className="w-64 h-10" />;
	}

	if (projectList.length === 0) {
		return (
			<p className="text-lg font-bold text-center">
				No project found. Create new one
			</p>
		);
	}

	console.log(projectList);

	return (
		<div className="relative w-full">
			<ProjectNavbar
				projectCount={projectList.length}
				fetchProjectList={fetchProjectList}
			/>
			<Topbar />
		</div>
	);
};

export default Projects;
