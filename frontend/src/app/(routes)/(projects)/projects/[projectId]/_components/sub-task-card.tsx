import React from "react";

import { cn } from "@/lib/utils";

import { MdDelete } from "react-icons/md";
import AddSubTask from "./add-sub-task-button";

type Props = {
	title: string;
	priority: string;
	isCompleted: boolean;
};

const SubTaskCard = ({ title, priority, isCompleted }: Props) => {
	return (
		<div className="flex items-center justify-between w-60 py-1 px-3 bg-white dark:bg-muted rounded-lg">
			<div className="flex items-center gap-2">
				<button
					className={cn(
						"flex items-center justify-center w-4 h-4 bg-gray-200 rounded-full",
						isCompleted && "border border-gray-200"
					)}
				>
					<button
						className={cn(
							"w-3 h-3 rounded-full",
							isCompleted && "bg-primary"
						)}
					/>
				</button>
				<p
					className={cn(
						"text-gray-600 dark:text-gray-400 text-sm",
						isCompleted &&
							"line-through text-gray-400 dark:text-gray-500"
					)}
				>
					{title}
				</p>
				<p
					className={cn(
						"px-2 py-0.5 text-[10px] rounded-lg pl-2",
						priority === "High" && "bg-red-500 text-red-100",
						priority === "Medium" &&
							"bg-yellow-500 text-yellow-200",
						priority === "Low" && "bg-green-500 text-green-200"
					)}
				>
					{priority}
				</p>
			</div>

			<button className="text-gray-500 dark:text-gray-400">
				<MdDelete />
			</button>
		</div>
	);
};

export default SubTaskCard;
