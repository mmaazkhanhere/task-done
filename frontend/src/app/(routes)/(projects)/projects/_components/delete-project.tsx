"use client";

import { deleteCategory } from "@/actions/category-actions/delete-category";
import { useToast } from "@/components/ui/use-toast";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";

type Props = {
	projectId: string;
	projectTitle: string;
	fetchProjectList: () => void;
	userId: string;
};

const DeleteProject = ({
	projectId,
	projectTitle,
	fetchProjectList,
	userId,
}: Props) => {
	const { toast } = useToast();

	if (!userId) {
		throw new Error("User not found");
	}

	const handleOnClick = async () => {
		try {
			const response = await deleteCategory(userId, projectId);

			console.log(response);

			if (response?.status == 200) {
				toast({
					title: "Category deleted",
				});
				fetchProjectList();
			} else {
				toast({
					title: "Something went wrong",
					description: "Failed to delete category",
					variant: "destructive",
				});
			}
		} catch (error) {
			console.error("[DELETE_PROJECT_API_ERROR]: ", error);
		}
	};

	return (
		<Dialog>
			<DialogTrigger className="flex items-center justify-center gap-2 text-sm w-full">
				<MdDelete />
				Delete
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Are you sure you want to delete `{projectTitle}`?
					</DialogTitle>
					<DialogDescription className="mt-2">
						This action cannot be undone. This will permanently
						delete project and all related tasks.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						onClick={handleOnClick}
						variant="destructive"
						type="submit"
					>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteProject;
