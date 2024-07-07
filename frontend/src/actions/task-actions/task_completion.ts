import axios from "axios";

export async function taskCompletion(
	task_id: string,
	creator_id: string,
	is_complete: boolean
) {
	try {
		const response = await axios.patch(
			`http://localhost:8000/task/complete/${task_id}`,
			{ is_complete },
			{
				headers: {
					"X-User-Id": creator_id,
					"Content-Type": "application/json",
				},
			}
		);
		console.log(response.status);

		if (response.status == 200) {
			return { state: 200, message: "Task completed successfully" };
		}
	} catch (error) {
		console.log("[TASK_COMPLETION_ERROR]: ", error);
		if (axios.isAxiosError(error) && error.response) {
			const status = error.response.status;
			let message = "Something went wrong";

			if (status === 409) {
				message = "Category already exists";
			} else {
				message = error.response.data.detail || message;
			}

			return { status, message };
		} else {
			return { status: 500, message: "Something went wrong" };
		}
	}
}
