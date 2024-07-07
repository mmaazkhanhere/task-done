import React from "react";

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { MdDelete } from "react-icons/md";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteProjectTask } from "@/actions/project-task-actions/delete-project-task";

type Props = {
	taskId: string;
	userId: string;
	getTaskList: () => void;
};

const ProjectTaskDeletion = ({ taskId, userId, getTaskList }: Props) => {
	const { toast } = useToast();

	const handleOnClick = async () => {
		const response = await deleteProjectTask(taskId, userId);
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

export default ProjectTaskDeletion;
