"use client";

import React, { useCallback, useEffect, useState } from "react";
import ProjectNavbar from "./_components/project-navbar";

import { Project } from "@/types/interface";
import { useAuth } from "@clerk/nextjs";
import { getAllProject } from "@/actions/project-actions/get-all-project";
import ProjectList from "./_components/project-list";

type Props = {};

const Projects = (props: Props) => {
	const [projectList, setProjectList] = useState<Project[] | null>(null);
	const { userId } = useAuth();

	if (!userId) {
		throw new Error("Not authorized");
	}

	const fetchProjectList = useCallback(async () => {
		const response = await getAllProject(userId as string);
		if (response.status == 500) {
			setProjectList(null);
		} else {
			setProjectList(response);
		}
	}, [userId]);

	useEffect(() => {
		fetchProjectList();
	}, [fetchProjectList]);

	return (
		<div className="relative w-full">
			<ProjectNavbar
				projectList={projectList!}
				fetchProjectList={fetchProjectList}
			/>
			<ProjectList
				projectList={projectList!}
				fetchProjectList={fetchProjectList}
				userId={userId}
			/>
		</div>
	);
};

export default Projects;
