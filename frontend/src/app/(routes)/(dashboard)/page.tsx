"use client";

import React, { useCallback, useEffect, useState } from "react";

import Navbar from "./_components/navbar/navbar";
import Statistics from "./_components/statistics";
import RightSideBar from "./_components/right-sidebar/right-sidebar";
import ProgressBarChart from "./_components/progress-bar-chart";
import RecentTasks from "./_components/recent-tasks";
import { Project, Task } from "@/types/interface";
import { getAllProject } from "@/actions/project-actions/get-all-project";
import { useAuth } from "@clerk/nextjs";
import { getAllTasks } from "@/actions/task-actions/get-all-tasks";

type Props = {};

const MainPage = (props: Props) => {
	const [projectsData, setProjectsData] = useState<Project[]>([]);
	const [tasksData, setTasksData] = useState<Task[]>([]);
	const { userId } = useAuth();

	if (!userId) {
		throw new Error("Not authorized");
	}

	const getProjectsData = useCallback(async () => {
		const response = await getAllProject(userId as string);
		setProjectsData(response);
	}, [userId]);

	const getTasksData = useCallback(async () => {
		const response = await getAllTasks(userId as string);
		setTasksData(response);
	}, [userId]);

	useEffect(() => {
		getProjectsData();
		getTasksData();
	}, [getProjectsData, getTasksData]);

	console.log(projectsData);
	console.log(tasksData);
	return (
		<section className="w-full relatives">
			<header className="w-full sticky z-50 top-0 left-0 bg-white dark:bg-muted">
				<Navbar />
			</header>

			<div className="flex flex-col items-center lg:item-start gap-y-4 w-full py-4">
				<div className="flex flex-col lg:flex-row w-full p-2 md:p-0">
					<div className="w-full lg:w-9/12 flex flex-col gap-y-8 lg:gap-y-4">
						<Statistics
							totalProjects={projectsData.length}
							tasksData={tasksData}
						/>
						<ProgressBarChart />
						<RecentTasks />
					</div>
					<RightSideBar />
				</div>
			</div>
		</section>
	);
};

export default MainPage;
