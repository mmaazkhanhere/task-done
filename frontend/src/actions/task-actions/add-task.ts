import { formatTimezone } from "@/helper/format-timezone";
import { AddTaskData } from "@/types/interface";
import axios from "axios";
import { uuid } from "uuidv4";

export async function addTask(values: AddTaskData, creator_id: string) {
	const id = uuid();
	const { title, priority } = values;
	const due_date = formatTimezone(values.due_date);
	try {
		const response = await axios.post("http://localhost:8000/task", {
			id,
			title,
			due_date,
			priority,
			creator_id,
		});
		if (response?.status == 200) {
			return { status: 200, message: "Task Created" };
		}
	} catch (error) {
		console.log("ADD_TASK_ERROR: ", error);
		return { status: 500, message: "Something went wrong" };
	}
}
