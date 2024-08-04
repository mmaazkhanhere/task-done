import axios from "axios";

export async function getAllProjectTasks(
	project_id: string,
	creator_id: string
) {
	try {
		const response = await axios.get(
			`http://localhost:8000/project/task/all/${project_id}`,
			{
				headers: {
					"X-User-Id": creator_id,
				},
			}
		);
		if (response.status == 200) {
			return response.data;
		} else {
			return { status: 500, message: "Something went wrong" };
		}
	} catch (error) {
		console.log(`[GET_ALL_TASKS_ACTION_ERROR]: ${error}`);
	}
}
