"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";

import CategoriesNavbar from "./_components/categories-navbar";
import CategoriesList from "./_components/categories-list";

import { Skeleton } from "@/components/ui/skeleton";

import { getCategoriesList } from "@/actions/category-actions/get-categories-list";

import { Category } from "@/types/interface";

type Props = {};

const CategoriesPage = (props: Props) => {
	const [categoryList, setCategoryList] = useState<Category[] | null>(null);
	const { userId } = useAuth();

	if (!userId) {
		throw new Error("User not found");
	}

	const categoriesData = () => {
		console.log("CategoriesPage");
	};

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

	if (categoryList === null) {
		return <Skeleton className="h-9 w-32" />;
	}

	return (
		<div className="w-full relative">
			<CategoriesNavbar
				categoriesCount={categoryList.length}
				fetchCategoriesList={fetchCategoriesList}
			/>

			<CategoriesList
				categoryList={categoryList}
				fetchCategoriesList={fetchCategoriesList}
			/>
		</div>
	);
};

export default CategoriesPage;
