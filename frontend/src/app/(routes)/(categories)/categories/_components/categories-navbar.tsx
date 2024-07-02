import React from "react";

import AddCategory from "./add-category";
import MobileSidebar from "@/app/(routes)/_components/mobile-sidebar";

import { Button } from "@/components/ui/button";

import { IoAdd } from "react-icons/io5";

type Props = {
	categoriesCount: number;
	fetchCategoriesList: () => void;
};

const CategoriesNavbar = ({ categoriesCount, fetchCategoriesList }: Props) => {
	return (
		<header className="sticky top-0 left-0 w-full flex items-center gap-4 md:gap-0 justify-between z-50 bg-white dark:bg-muted py-3 md:py-4 px-4 shadow-sm">
			<div className="md:hidden">
				<MobileSidebar />
			</div>
			<div className="flex items-center justify-center gap-4 lg:gap-8">
				<div className="flex flex-col items-start">
					<h2 className="text-lg md:text-xl font-bold">Categories</h2>
					<p className="text-gray-400 text-xs md:text-sm">
						{categoriesCount} Categories
					</p>
				</div>
				<AddCategory fetchCategoriesList={fetchCategoriesList} />
			</div>
		</header>
	);
};

export default CategoriesNavbar;
