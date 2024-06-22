import React from "react";
import CategoriesNavbar from "./_components/categories-navbar";
import CategoriesList from "./_components/categories-list";

type Props = {};

const CategoriesPage = (props: Props) => {
	return (
		<div className="w-full relative">
			<CategoriesNavbar />
			<CategoriesList />
		</div>
	);
};

export default CategoriesPage;
