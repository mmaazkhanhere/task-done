import React from "react";
import TaskListNavbar from "./_components/tasklist-navbar";
import { auth } from "@clerk/nextjs/server";

type Props = {};

const TasksList = (props: Props) => {
	const { userId } = auth();
	if (!userId) {
		throw new Error("Not authorized");
	}
	return (
		<div>
			<TaskListNavbar userId={userId} />
		</div>
	);
};

export default TasksList;
