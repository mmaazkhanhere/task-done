import React from "react";

import { cn } from "@/lib/utils";

import { MdDelete } from "react-icons/md";
import AddSubTask from "./add-sub-task-button";
import SubTaskCompletionButton from "./subtask-completion-button";
import { SubTasks } from "@/types/interface";

type Props = {
	subTask: SubTasks;
	userId: string;
	getSubTaskList: () => void;
};

const SubTaskCard = ({ subTask, userId, getSubTaskList }: Props) => {
	console.log(subTask);

	return (
		<div className="flex items-center justify-between w-60 py-1 px-3 bg-white dark:bg-muted rounded-lg">
			<div className="flex items-center gap-2">
				<SubTaskCompletionButton
					subTaskId={subTask.id}
					isCompleted={subTask.is_completed}
					userId={userId}
					getSubTaskList={getSubTaskList}
				/>
				<p
					className={cn(
						"text-gray-600 dark:text-gray-400 text-sm",
						subTask.is_completed &&
							"line-through text-gray-400 dark:text-gray-500"
					)}
				>
					{subTask.title}
				</p>
				<p
					className={cn(
						"px-2 py-0.5 text-[10px] rounded-lg pl-2",
						subTask.priority === "High" &&
							"bg-red-500 text-red-100",
						subTask.priority === "Medium" &&
							"bg-yellow-500 text-yellow-200",
						subTask.priority === "Low" &&
							"bg-green-500 text-green-200"
					)}
				>
					{subTask.priority}
				</p>
			</div>

			<button className="text-gray-500 dark:text-gray-400">
				<MdDelete />
			</button>
		</div>
	);
};

export default SubTaskCard;
