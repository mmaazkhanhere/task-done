import React from "react";

import { BsThreeDots } from "react-icons/bs";
import CategoryDropdownMenu from "./category-dropdown-menu";

type Props = {
	title: string;
	projects: number;
};

const CategoriesCard = ({ title, projects }: Props) => {
	return (
		<div className="bg-gray-100 dark:bg-muted-foreground/30 p-4 w-full rounded-xl flex flex-col">
			<div className="flex items-center justify-between w-full">
				<h2>{title}</h2>
				<CategoryDropdownMenu />
			</div>
			<p className="text-sm text-gray-500 dark:text-gray-400">
				{projects} projects
			</p>
		</div>
	);
};

export default CategoriesCard;
