import { Task } from "@/types/interface";
import React from "react";
import TaskCard from "./task-card";

type Props = {
	taskList: Task[];
	userId: string;
};

const TaskList = ({ taskList, userId }: Props) => {
	if (taskList.length === 0) {
		return (
			<p className="text-gray-400 font-semibold p-4">
				No tasks created. Create a new one!
			</p>
		);
	}

	return (
		<section className="grid grid-cols-1 lg:grid-cols-2 gap-5 p-4">
			{taskList.map((task) => (
				<TaskCard key={task.id} userId={userId} task={task} />
			))}
		</section>
	);
};

export default TaskList;
