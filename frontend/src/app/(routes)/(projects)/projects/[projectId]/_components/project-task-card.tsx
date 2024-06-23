"use client";

import React, { useState } from "react";

import ProjecTaskDropdownMenu from "./project-task-dropdown-menu";

import { cn } from "@/lib/utils";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SubTaskCard from "./sub-task-card";
import AddSubTask from "./add-sub-task-button";

type Props = {
	title: string;
	priority: string;
	isCompleted: boolean;
	subTasks: {
		title: string;
		priority: string;
		isCompleted: boolean;
	}[];
};

const ProjectTaskCard = ({ title, priority, isCompleted, subTasks }: Props) => {
	const [showSubTask, setShowSubTask] = useState<boolean>(false);

	const handleShowSubTask = () => {
		setShowSubTask(!showSubTask);
	};

	return (
		<article className="flex flex-col items-start bg-gray-100 dark:bg-muted-foreground/30 p-4 m-4 gap-4 rounded-lg">
			<div className="flex items-center justify-between w-full">
				<div className="flex flex-col items-start">
					<div className="items-center flex gap-2">
						<button
							className={cn(
								"flex items-center justify-center w-6 h-6 bg-white rounded-full",
								isCompleted && "border border-gray-300"
							)}
						>
							<button
								className={cn(
									"w-5 h-5 rounded-full",
									isCompleted && "bg-primary"
								)}
							/>
						</button>
						<p
							className={cn(
								"md:text-lg font-medium",
								isCompleted && "line-through text-gray-500"
							)}
						>
							{title}
						</p>
						<button onClick={handleShowSubTask}>
							{showSubTask ? (
								<IoIosArrowUp />
							) : (
								<IoIosArrowDown />
							)}
						</button>
					</div>
					{showSubTask && (
						<div className="pl-12 flex flex-col items-start gap-2 mt-2">
							{subTasks.map((task) => (
								<SubTaskCard
									key={task.title}
									title={task.title}
									isCompleted={task.isCompleted}
									priority={task.priority}
								/>
							))}
							<AddSubTask />
						</div>
					)}
				</div>

				<ProjecTaskDropdownMenu />
			</div>
			<p
				className={cn(
					"px-4 py-0.5 text-sm rounded-lg",
					priority === "High" && "bg-red-500 text-red-100",
					priority === "Medium" && "bg-yellow-500 text-yellow-200",
					priority === "Low" && "bg-green-500 text-green-200"
				)}
			>
				{priority}
			</p>
		</article>
	);
};

export default ProjectTaskCard;
