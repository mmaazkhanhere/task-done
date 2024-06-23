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
		<div className="flex items-center justify-between w-full">
			<div className="flex items-center gap-2">
				<button
					className={cn(
						"flex items-center justify-center w-4 h-4 bg-white rounded-full",
						isCompleted && "border border-gray-300"
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
						"text-gray-600 text-sm",
						isCompleted && "line-through text-gray-400"
					)}
				>
					{title}
				</p>
			</div>

			<button className="text-gray-500">
				<MdDelete />
			</button>
		</div>
	);
};

export default SubTaskCard;
