import { projectTaskCompletion } from "@/actions/project-task-actions/project-task-completion";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
	isCompleted: boolean;
	userId: string;
};

const TaskCompletionButton = ({ userId, isCompleted }: Props) => {
	const { toast } = useToast();

	const handleOnClick = async () => {
		console.log("button");
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
