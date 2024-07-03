"use client";

import React, { useCallback, useEffect, useState } from "react";
import ProjectNavbar from "./_components/project-navbar";
import Topbar from "./_components/top-bar";
import { Project } from "@/types/interface";
import { useAuth } from "@clerk/nextjs";
import { getAllProject } from "@/actions/project-actions/get-all-project";

type Props = {};

const Projects = (props: Props) => {
	const { userId } = useAuth();

	const [projectList, setProjectList] = useState<Project[] | null>(null);

	const fetchProjectList = useCallback(async () => {
		try {
			const response = await getAllProject(userId as string);
			if (response.status == 500) {
				setProjectList(null);
			} else {
				setProjectList(response);
			}
		} catch (error) {
			console.error(`[FETCH_PRJECT_LIST_CALLBACK_ERROR]: `, error);
		}
	}, [userId]);

	useEffect(() => {
		fetchProjectList();
	}, [fetchProjectList]);

	console.log(projectList);

	return (
		<div className="relative w-full">
			<ProjectNavbar
				projectList={projectList!}
				fetchProjectList={fetchProjectList}
			/>
			<Topbar />
		</div>
	);
};

export default Projects;
