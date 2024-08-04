import React from "react";

import CategoryDropdownMenu from "./category-dropdown-menu";

type Props = {
	id: string;
	title: string;
	projects: number;
	fetchCategoriesList: () => void;
};

const CategoriesCard = ({
	title,
	projects,
	id,
	fetchCategoriesList,
}: Props) => {
	return (
		<div className="bg-gray-100 dark:bg-muted-foreground/30 p-4 w-full rounded-xl flex flex-col">
			<div className="flex items-center justify-between w-full">
				<h2>{title}</h2>
				<CategoryDropdownMenu
					categoryId={id}
					fetchCategoriesList={fetchCategoriesList}
				/>
			</div>
			<p className="text-sm text-gray-500 dark:text-gray-400">
				{projects} projects
			</p>
		</div>
	);
};

export default CategoriesCard;
