import TaskDueDateCountdown from "@/components/task-duedate-countdown";
import { formatDateTime } from "@/helper/format-date-time";
import { Task } from "@/types/interface";
import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

import { TiTick } from "react-icons/ti";

type Props = {
	task: Task;
};

const RecentTaskCard = ({ task }: Props) => {
	const formattedDate = formatDateTime(task.created_at);

	return (
		<div className="flex items-center justify-around gap-x-5 w-full bg-white dark:bg-muted-foreground/30 rounded-md py-1">
			<p className="font-medium text-lg md:text-xl">{task.title}</p>
			<div className="hidden md:flex flex-col text-xs md:text-sm">
				<p className="font-light">Created At</p>
				<p className="text-green-500">{formattedDate}</p>
			</div>
			<div className="flex flex-col text-xs md:text-sm">
				<p className="font-light">Time Remaining</p>
				<TaskDueDateCountdown dueDate={task.due_date} />
			</div>
			<div className="hidden md:flex flex-col text-xs md:text-sm">
				<p className="font-light">Status</p>
				{task.completion_date ? (
					<div className="p-1">
						<TiTick className="bg-teal-500 rounded-full text-white w-6 h-6" />
					</div>
				) : (
					<div className="p-1 ">
						<IoMdCloseCircle className="text-red-500 rounded-full w-7 h-7" />
					</div>
				)}
			</div>
		</div>
	);
};

export default RecentTaskCard;
