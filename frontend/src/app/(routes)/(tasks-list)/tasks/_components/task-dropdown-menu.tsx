import React from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BsThreeDots } from "react-icons/bs";

import { Task } from "@/types/interface";
import EditTask from "./edit-task";

type Props = {
	userId: string;
	task: Task;
	getTaskList: () => void;
};

const TaskDropdownMenu = ({ userId, task, getTaskList }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="text-gray-500 dark:text-gray-200 w-5 h-5 hover:opacity-70 transition duration-300">
				<BsThreeDots />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					<EditTask
						userId={userId}
						task={task}
						getTaskList={getTaskList}
					/>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					{/* <ProjectTaskDeletion
						userId={userId}
						taskId={task.id}
						getTaskList={getTaskList}
					/> */}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default TaskDropdownMenu;
