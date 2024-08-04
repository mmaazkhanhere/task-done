import React from "react";

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { deleteTask } from "@/actions/task-actions/delete-task";

import { MdDelete } from "react-icons/md";

type Props = {
	taskId: string;
	userId: string;
	getTaskList: () => void;
};

const DeleteTask = ({ taskId, userId, getTaskList }: Props) => {
	const { toast } = useToast();

	const handleOnClick = async () => {
		const response = await deleteTask(taskId, userId);
		if (response?.status === 200) {
			toast({
				title: "Task Deleted",
			});
			getTaskList();
		} else {
			toast({
				variant: "destructive",
				title: "Something went wrong",
				description: "Could not delete the task",
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
						Are you sure you want to delete task?
					</DialogTitle>
					<DialogDescription className="mt-2">
						This action cannot be undone. This will permanently
						delete task and all related sub tasks.
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

export default DeleteTask;
