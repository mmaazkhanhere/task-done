"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

import CategoriesCard from "./categories-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategoriesList } from "@/actions/category-actions/get-categories-list";
import { Category } from "@/types/interface";

type Props = {};

const CategoriesList = (props: Props) => {
	const [categoryList, setCategoryList] = useState<Category[]>([]);
	const { userId } = useAuth();

	if (!userId) {
		throw new Error("User not found");
	}

	const fetchCategoriesList = useCallback(async () => {
		try {
			const cateogriesData = await getCategoriesList(userId as string);
			setCategoryList(cateogriesData);
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

	return (
		<div className="bg-gray-100/50 dark:bg-muted p-6 m-6 flex flex-col items-start gap-5 rounded-xl">
			{categoryList.map((category) => (
				<CategoriesCard
					key={category.id}
					id={category.id}
					title={category.title}
					fetchCategoriesList={fetchCategoriesList}
					projects={1}
				/>
			))}
		</div>
	);
};

export default CategoriesList;
