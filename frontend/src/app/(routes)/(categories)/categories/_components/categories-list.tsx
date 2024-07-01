"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

import CategoriesCard from "./categories-card";
import { Skeleton } from "@/components/ui/skeleton";

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
	const [categoryList, setCategoryList] = useState<any[]>([]);

	const { userId } = useAuth();

	if (!userId) {
		throw new Error("User not found");
	}

	const fetchCategoriesList = useCallback(async () => {
		console.log("fetchCategoriesList");
		try {
			const response = await axios.get(
				`http://localhost:8000/category/all/`,
				{
					headers: {
						"X-User-Id": userId,
					},
				}
			);

			const data = response.data;

			setCategoryList(data);
		} catch (error) {
			console.error(`[CATEGORIES_FETCH_USE_EFFECT_ERROR]: `, error);
		}
	}, [userId]);

	useEffect(() => {
		fetchCategoriesList();
	}, [fetchCategoriesList]);

	if (!categoryList) {
		<Skeleton className="w-[100px] h-[40px] rounded-full" />;
	}

	console.log(categoryList);

	return (
		<div className="bg-gray-100/50 dark:bg-muted p-6 m-6 flex flex-col items-start gap-5 rounded-xl">
			{categoryList.map((category) => (
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
