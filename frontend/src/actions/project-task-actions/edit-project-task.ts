import { formatTimezone } from "@/helper/format-timezone";
import { EditTaskData } from "@/types/interface";
import axios from "axios";

export async function editProjectTask(
	task_id: string,
	creator_id: string,
	editData: EditTaskData
) {
	const { title, priority } = editData;
	const due_date = formatTimezone(editData.due_date);
	try {
		const response = await axios.patch(
			`http://localhost:8000/api/project/task/edit/${task_id}`,
			{
				title,
				priority,
				due_date,
			},
			{
				headers: {
					"X-User-Id": creator_id,
					"Content-Type": "application/json",
				},
			}
		);

		if (response.status === 200) {
			return { status: 200, message: "Project Successfully Edited" };
		}
	} catch (error) {
		console.log("[EDIT_TASK_ACTION_ERROR]: ", error);
	}
}
