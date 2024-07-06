import { taskCompletion } from "@/actions/task-actions/task_completion";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import React from "react";

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
	console.log(isCompleted);
	const { toast } = useToast();

	const handleOnClick = async () => {
		const response = await taskCompletion(taskId, userId, !isCompleted);
		if (response?.state == 200) {
			toast({
				title: "Task Completed",
			});
			getTaskList();
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
