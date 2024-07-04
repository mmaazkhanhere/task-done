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
import DeleteProject from "./delete-project";

type Props = {
	project: Project;
	fetchProjectList: () => void;
	userId: string;
};

const ProjectDropdownMenu = ({ project, fetchProjectList, userId }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="text-gray-500 dark:text-gray-200 w-5 h-5 hover:opacity-70 transition duration-300">
				<BsThreeDots />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					<EditProject
						project={project}
						fetchProjectList={fetchProjectList}
						userId={userId}
					/>
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					<DeleteProject
						userId={userId}
						projectId={project.id}
						projectTitle={project.title}
						fetchProjectList={fetchProjectList}
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProjectDropdownMenu;
