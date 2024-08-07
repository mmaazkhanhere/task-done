"use client";
import React from "react";

import EditCategory from "./edit-category";
import DeleteCategory from "./delete-category";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";


type Props = {
	categoryId: string;
	fetchCategoriesList: () => void;
};

const CategoryDropdownMenu = ({ categoryId, fetchCategoriesList }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="text-gray-500 dark:text-gray-200 w-5 h-5 hover:opacity-70 transition duration-300">
				<BsThreeDots />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					<EditCategory
						categoryId={categoryId}
						fetchCategoriesList={fetchCategoriesList}
					/>
				</DropdownMenuItem>
				<DropdownMenuItem className="flex items-center justify-center gap-2 text-sm cursor-pointer">
					<DeleteCategory
						categoryId={categoryId}
						fetchCategoriesList={fetchCategoriesList}
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default CategoryDropdownMenu;
