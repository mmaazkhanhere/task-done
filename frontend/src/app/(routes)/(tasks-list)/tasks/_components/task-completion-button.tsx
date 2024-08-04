import React from "react";

import { taskCompletion } from "@/actions/task-actions/task-completion";

import { useToast } from "@/components/ui/use-toast";

import { cn } from "@/lib/utils";

type Props = {
	taskId: string;
	isCompleted: boolean;
	userId: string;
	getTaskList: () => void;
};

const TaskCompletionButton = ({
	taskId,
	userId,
	isCompleted,
	getTaskList,
}: Props) => {
	const { toast } = useToast();

	const handleOnClick = async () => {
		console.log(isCompleted);
		const response = await taskCompletion(taskId, userId, !isCompleted);
		if (response?.state == 200) {
			toast({
				title: "Task Completed",
			});
			getTaskList();
		} else if (response?.message.includes("409")) {
			toast({
				variant: "destructive",
				title: "Subtasks are not completed yet",
				description: "Complete the subtasks",
			});
		} else {
			toast({
				variant: "destructive",
				title: "Something went wrong",
				description: "Cannot update task completion state",
			});
		}
	};

	return (
		<button
			onClick={handleOnClick}
			className={cn(
				"flex items-center justify-center w-6 h-6 bg-white rounded-full",
				isCompleted && "border border-gray-300"
			)}
		>
			<button
				className={cn(
					"w-5 h-5 rounded-full",
					isCompleted && "bg-primary"
				)}
			/>
		</button>
	);
};

export default TaskCompletionButton;
