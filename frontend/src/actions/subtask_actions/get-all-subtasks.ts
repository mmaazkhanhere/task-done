import axios from "axios";

export async function getAllSubTasks(task_id: string, creator_id: string) {
	try {
		const response = await axios.get(
			`http://localhost:8000/subtask/all/${task_id}`,
			{
				headers: {
					"X-User-Id": creator_id,
				},
			}
		);
		if (response?.status == 200) {
			return response.data;
		}
	} catch (error) {
		console.log("GET_SUBTASK_LIST_ACTION_ERROR: ", error);
		return { status: 500, message: "Something went wrong" };
	}
}
