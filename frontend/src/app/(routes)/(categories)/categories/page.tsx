"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";

import CategoriesNavbar from "./_components/categories-navbar";
import CategoriesList from "./_components/categories-list";

import { getCategoriesList } from "@/actions/category-actions/get-categories-list";

import { Category } from "@/types/interface";

type Props = {};

const CategoriesPage = (props: Props) => {
	const [categoryList, setCategoryList] = useState<Category[] | null>([]);
	const { userId } = useAuth();

	if (!userId) {
		throw new Error("User not found");
	}

	const fetchCategoriesList = useCallback(async () => {
		const cateogriesData = await getCategoriesList(userId as string);

		if (cateogriesData.status === 500) {
			setCategoryList(null);
		} else {
			setCategoryList(cateogriesData);
		}
	}, [userId]);

	useEffect(() => {
		fetchCategoriesList();
	}, [fetchCategoriesList]);

	return (
		<div className="w-full relative">
			<CategoriesNavbar
				categoryList={categoryList!}
				fetchCategoriesList={fetchCategoriesList}
			/>

			<CategoriesList
				categoryList={categoryList!}
				fetchCategoriesList={fetchCategoriesList}
			/>
		</div>
	);
};

export default CategoriesPage;
