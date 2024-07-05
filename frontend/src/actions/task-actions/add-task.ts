import { AddTaskData } from "@/types/interface";
import axios from "axios";
import { uuid } from "uuidv4";

export async function addTask(
	values: AddTaskData,
	project_id: string,
	creator_id: string
) {
	const id = uuid();
	const { title, due_date, priority } = values;
	console.log({ id, title, due_date, priority, project_id, creator_id });
	try {
		const response = await axios.post("http://localhost:8000/task", {
			id,
			title,
			due_date,
			priority,
			project_id,
			creator_id,
		});
		if (response?.status == 200) {
			return { status: 200, message: "Task Created" };
		}
	} catch (error) {
		return { status: 500, message: "Something went wrong" };
	}
}
