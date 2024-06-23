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

type Props = {};

const ProjecTaskDropdownMenu = (props: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="text-gray-500 dark:text-gray-200 w-5 h-5 hover:opacity-70 transition duration-300">
				<BsThreeDots />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem className="flex items-center justify-center gap-2 text-sm cursor-pointer">
					<MdEdit />
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem className="flex items-center justify-center gap-2 text-sm cursor-pointer">
					<MdDelete />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ProjecTaskDropdownMenu;
