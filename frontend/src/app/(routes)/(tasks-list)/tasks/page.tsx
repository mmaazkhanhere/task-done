"use client";

import React, { useCallback, useEffect, useState } from "react";
import TaskListNavbar from "./_components/tasklist-navbar";
import { useAuth } from "@clerk/nextjs";
import { Task } from "@/types/interface";
import { getAllTasks } from "@/actions/task-actions/get-all-tasks";

type Props = {};

const TasksList = (props: Props) => {
	const [taskList, setTaskList] = useState<Task[]>([]);

	const { userId } = useAuth();

	if (!userId) {
		throw new Error("Not authorized");
	}

	const getTaskList = useCallback(async () => {
		const response = await getAllTasks(userId);
		setTaskList(response);
	}, [userId]);

	useEffect(() => {
		getTaskList();
	}, [getTaskList]);

	console.log(taskList);

	return (
		<div>
			<TaskListNavbar
				totalTasks={taskList.length}
				getTaskList={getTaskList}
				userId={userId}
			/>
		</div>
	);
};

export default TasksList;
