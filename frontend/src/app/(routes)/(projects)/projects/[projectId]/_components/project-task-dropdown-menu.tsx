import React from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BsThreeDots } from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";
import EditProjectTask from "./edit-project-task";
import { Task } from "@/types/interface";

type Props = {
	userId: string;
	task: Task;
	getProjectData: () => void;
	getTaskList: () => void;
};

const ProjectTaskDropdownMenu = ({
	userId,
	task,
	getProjectData,
	getTaskList,
}: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="text-gray-500 dark:text-gray-200 w-5 h-5 hover:opacity-70 transition duration-300">
				<BsThreeDots />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					<EditProjectTask
						userId={userId}
						task={task}
						getProjectData={getProjectData}
						getTaskList={getTaskList}
					/>
				</DropdownMenuItem>
				<DropdownMenuItem className="flex items-center justify-center gap-2 text-sm cursor-pointer">
					<MdDelete />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProjectTaskDropdownMenu;
