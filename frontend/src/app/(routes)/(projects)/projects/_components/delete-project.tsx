"use client";

import React from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

import { deleteProject } from "@/actions/project-actions/delete_project";

import { MdDelete } from "react-icons/md";

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
		const response = await deleteProject(projectId, userId);

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
