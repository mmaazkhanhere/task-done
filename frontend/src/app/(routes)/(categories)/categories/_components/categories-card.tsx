import React from "react";

import { BsThreeDots } from "react-icons/bs";

type Props = {
	title: string;
	projects: number;
};

const CategoriesCard = ({ title, projects }: Props) => {
	return (
		<div className="bg-gray-100 dark:bg-muted-foreground/30 p-4 w-full rounded-xl flex flex-col">
			<div className="flex items-center justify-between w-full">
				<h2>{title}</h2>
				<button className="hover:opacity-70 transition duration-300">
					<BsThreeDots className="text-gray-500 dark:text-gray-200 w-5 h-5" />
				</button>
			</div>
			<p className="text-sm text-gray-500 dark:text-gray-400">
				{projects} projects
			</p>
		</div>
	);
};

export default CategoriesCard;
