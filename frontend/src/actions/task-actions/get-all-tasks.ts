import axios from "axios";

export async function getAllTasks(creator_id: string) {
	try {
		const response = await axios.get(`http://localhost:8000/task/all`, {
			headers: {
				"X-User-Id": creator_id,
			},
		});
		console.log(response);
		if (response.status == 200) {
			return response.data;
		} else {
			return { status: 500, message: "Something went wrong" };
		}
	} catch (error) {
		console.log(`[GET_ALL_TASKS_ACTION_ERROR]: ${error}`);
	}
}
