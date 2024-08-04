import React from "react";

import CategoriesCard from "./categories-card";
import { Skeleton } from "@/components/ui/skeleton";

import { Category } from "@/types/interface";

type Props = {
	categoryList: Category[];
	fetchCategoriesList: () => void;
};

const CategoriesList = ({ categoryList, fetchCategoriesList }: Props) => {
	if (categoryList === null) {
		<div className="flex flex-col gap-5 mt-8 m-4 p-4 md:p-6">
			<div className="w-24 h-24 rounded-full bg-slate-100" />
			<Skeleton className="h-10 w-full md:w-[650px] bg-gray-100" />
			<Skeleton className="h-10 w-full md:w-[650px] bg-gray-100" />
			<Skeleton className="h-10 w-full md:w-[650px] bg-gray-100" />
		</div>;
	}

	if (categoryList.length === 0 || categoryList === null) {
		return (
			<div className="text-lg text-center text- text-black">
				No categories created yet. Create one now!
			</div>
		);
	}

	console.log(categoryList[0]);

	return (
		<div className="bg-gray-100/50 dark:bg-muted p-6 m-6 flex flex-col items-start gap-5 rounded-xl">
			{categoryList.map((category) => (
				<CategoriesCard
					key={category.id}
					id={category.id}
					title={category.title}
					fetchCategoriesList={fetchCategoriesList}
					projects={category.projects?.length as number}
				/>
			))}
		</div>
	);
};

export default CategoriesList;
