import { formatTimezone } from "@/helper/format-timezone";
import { AddSubtaskData } from "@/types/interface";
import axios from "axios";
import { uuid } from "uuidv4";

export async function addSubTask(
	values: AddSubtaskData,
	task_id: string,
	creator_id: string
) {
	const id = uuid();
	const { title, priority } = values;
	const due_date = formatTimezone(values.due_date);
	try {
		const response = await axios.post("http://localhost:8000/api/subtask", {
			id,
			title,
			priority,
			due_date,
			creator_id,
			task_id,
		});
		if (response?.status == 200) {
			return { status: 200, message: "Subtask Created" };
		}
	} catch (error) {
		console.log("ADD_SUBTASK_ACTION_ERROR", error);
		return { status: 500, message: "Something went wrong" };
	}
}
