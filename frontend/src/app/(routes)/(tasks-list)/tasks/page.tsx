"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

import TaskListNavbar from "./_components/tasklist-navbar";
import TaskList from "./_components/tasklist";

import { getAllSimpleTasks } from "@/actions/task-actions/get-all-simple-task";

import { Task } from "@/types/interface";

type Props = {};

const TasksList = (props: Props) => {
	const [taskList, setTaskList] = useState<Task[]>([]);

	const { userId } = useAuth();

	if (!userId) {
		throw new Error("Not authorized");
	}

	const getTaskList = useCallback(async () => {
		const response = await getAllSimpleTasks(userId);
		setTaskList(response);
	}, [userId]);

	useEffect(() => {
		getTaskList();
	}, [getTaskList]);

	return (
		<div className="w-full">
			<TaskListNavbar
				totalTasks={taskList.length}
				getTaskList={getTaskList}
				userId={userId}
			/>
			<TaskList
				userId={userId}
				taskList={taskList}
				getTaskList={getTaskList}
			/>
		</div>
	);
};

export default TasksList;
