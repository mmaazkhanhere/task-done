import axios from "axios";

export async function deleteSubtask(subtask_id: string, creator_id: string) {
	try {
		const response = await axios.delete(
			`http://localhost:8000/api/subtask/delete/${subtask_id}`,
			{
				headers: {
					"X-User-Id": creator_id,
				},
			}
		);

		if (response?.status == 200) {
			return { status: 200, message: "Subtask Deleted" };
		}
	} catch (error) {
		console.log("DELETE_SUBTASK_ACTION_ERROR", error);
		return { status: 500, message: "Something went wrong" };
	}
}
