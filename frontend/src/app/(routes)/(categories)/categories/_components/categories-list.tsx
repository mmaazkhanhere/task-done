import React from "react";
import CategoriesCard from "./categories-card";

type Props = {};

const categoriesList = [
	{
		id: 1,
		title: "Category 1",
		projects: 2,
	},
	{
		id: 2,
		title: "Category 2",
		projects: 1,
	},
	{
		id: 3,
		title: "Category 3",
		projects: 4,
	},
];

const CategoriesList = (props: Props) => {
	return (
		<div className="bg-gray-100/50 dark:bg-muted p-6 m-6 flex flex-col items-start gap-5 rounded-xl">
			{categoriesList.map((category) => (
				<CategoriesCard
					key={category.id}
					title={category.title}
					projects={category.projects}
				/>
			))}
		</div>
	);
};

export default CategoriesList;
