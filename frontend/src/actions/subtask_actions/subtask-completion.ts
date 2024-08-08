import axios from "axios";

export async function subTaskCompletion(
	subtask_id: string,
	creator_id: string,
	is_complete: boolean
) {
	try {
		const response = await axios.patch(
			`http://localhost:8000/api/subtask/complete/${subtask_id}`,
			{ is_complete },
			{
				headers: {
					"X-User-Id": creator_id,
					"Content-Type": "application/json",
				},
			}
		);

		if (response.status == 200) {
			return { state: 200, message: "Subtask completed successfully" };
		}
	} catch (error) {
		console.log("[TASK_COMPLETION_ERROR]: ", error);
		return { state: 500, message: "Internal server error" };
	}
}
