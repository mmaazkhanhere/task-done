import React from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Project } from "@/types/interface";
import EditProject from "./edit-project";

type Props = {
	project: Project;
};

const ProjectDropdownMenu = ({ project }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="text-gray-500 dark:text-gray-200 w-5 h-5 hover:opacity-70 transition duration-300">
				<BsThreeDots />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					<EditProject project={project} />
				</DropdownMenuItem>
				<DropdownMenuItem className="flex items-center justify-center gap-2 text-sm cursor-pointer">
					<MdDelete />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProjectDropdownMenu;
