import React, { useCallback, useEffect, useState } from "react";

import TaskDropdownMenu from "./task-dropdown-menu";
import TaskCompletionButton from "./task-completion-button";
import SubTaskCard from "@/app/(routes)/(projects)/projects/[projectId]/_components/sub-task-card";
import AddSubTask from "@/app/(routes)/(projects)/projects/[projectId]/_components/add-sub-task-button";

import TaskDueDateCountdown from "@/components/task-duedate-countdown";

import { getAllSubTasks } from "@/actions/subtask_actions/get-all-subtasks";

import { cn } from "@/lib/utils";

import { SubTasks, Task } from "@/types/interface";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type Props = {
	userId: string;
	task: Task;
	getTaskList: () => void;
};

const TaskCard = ({ task, userId, getTaskList }: Props) => {
	const [showSubTask, setShowSubTask] = useState<boolean>(false);
	const [subTaskList, setSubTaskList] = useState<SubTasks[]>([]);

	const getSubTaskList = useCallback(async () => {
		const response = await getAllSubTasks(task.id, userId);
		setSubTaskList(response);
	}, [task.id, userId]);

	useEffect(() => {
		getSubTaskList();
	}, [getSubTaskList]);

	const handleShowSubTask = () => {
		setShowSubTask(!showSubTask);
	};

	return (
		<article className="flex flex-col items-start bg-gray-100 dark:bg-muted-foreground/30 p-4 m-4 gap-4 rounded-lg">
			<div className="flex items-center justify-between w-full">
				<div className="flex flex-col items-start">
					<div className="items-center flex gap-4">
						<TaskCompletionButton
							isCompleted={task.is_completed}
							userId={userId}
							taskId={task.id}
							getTaskList={getTaskList}
						/>
						<div className="flex flex-col items-start">
							<p
								className={cn(
									"md:text-lg font-medium",
									task.is_completed &&
										"line-through text-gray-500"
								)}
							>
								{task.title}
							</p>
							<div>
								<TaskDueDateCountdown dueDate={task.due_date} />
							</div>
						</div>
						<button onClick={handleShowSubTask}>
							{showSubTask ? (
								<IoIosArrowUp />
							) : (
								<IoIosArrowDown />
							)}
						</button>
					</div>
					{showSubTask && (
						<div className="pl-12 flex flex-col items-start gap-2 mt-4">
							{subTaskList.length == 0 ? (
								<p className="text-sm font-semibold">
									No subtasks yet. Create new one!
								</p>
							) : (
								subTaskList.map((task) => (
									<SubTaskCard
										key={task.title}
										subTask={task}
										userId={userId}
										getSubTaskList={getSubTaskList}
									/>
								))
							)}
							<AddSubTask
								taskId={task.id}
								userId={userId}
								getTaskList={getTaskList}
								getSubTaskList={getSubTaskList}
							/>
						</div>
					)}
				</div>
				<TaskDropdownMenu
					task={task}
					userId={userId}
					getTaskList={getTaskList}
				/>
			</div>
			<p
				className={cn(
					"px-4 py-0.5 text-sm rounded-lg",
					task.priority === "High" && "bg-red-500 text-red-100",
					task.priority === "Medium" &&
						"bg-yellow-500 text-yellow-200",
					task.priority === "Low" && "bg-green-500 text-green-200"
				)}
			>
				{task.priority}
			</p>
		</article>
	);
};

export default TaskCard;
