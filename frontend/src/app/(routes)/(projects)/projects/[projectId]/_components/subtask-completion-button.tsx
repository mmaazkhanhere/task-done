import { subTaskCompletion } from "@/actions/subtask_actions/subtask-completion";
import { taskCompletion } from "@/actions/task-actions/task_completion";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
	subTaskId: string;
	isCompleted: boolean;
	userId: string;
	getSubTaskList: () => void;
};

const SubTaskCompletionButton = ({
	subTaskId,
	userId,
	isCompleted,
	getSubTaskList,
}: Props) => {
	const { toast } = useToast();

	const handleOnClick = async () => {
		console.log(isCompleted);
		const response = await subTaskCompletion(
			subTaskId,
			userId,
			!isCompleted
		);
		if (response?.state == 200) {
			toast({
				title: "Subtask Completed",
			});
			getSubTaskList();
		} else {
			toast({
				variant: "destructive",
				title: "Something went wrong",
				description: "Cannot update subtask completion state",
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

export default SubTaskCompletionButton;
