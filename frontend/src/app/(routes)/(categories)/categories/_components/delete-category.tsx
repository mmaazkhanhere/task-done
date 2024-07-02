"use client";

import { deleteCategory } from "@/actions/category-actions/delete-category";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/nextjs";

import React from "react";
import { MdDelete } from "react-icons/md";

type Props = {
	categoryId: string;
	fetchCategoriesList: () => void;
};

const DeleteCategory = ({ categoryId, fetchCategoriesList }: Props) => {
	const { userId } = useAuth();
	const { toast } = useToast();

	if (!userId) {
		throw new Error("User not found");
	}

	const handleOnClick = async () => {
		try {
			const response = await deleteCategory(userId, categoryId);

			console.log(response);

			if (response?.status == 200) {
				toast({
					title: "Category deleted",
				});
				fetchCategoriesList();
			} else {
				toast({
					title: "Something went wrong",
					description: "Failed to delete category",
					variant: "destructive",
				});
			}
		} catch (error) {
			console.error("[DELETE_CATEGORY_API_ERROR]: ", error);
		}
	};

	return (
		<button
			onClick={handleOnClick}
			className="flex items-center justify-center gap-2 text-sm"
		>
			<MdDelete />
			Delete
		</button>
	);
};

export default DeleteCategory;
