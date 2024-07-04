import axios from "axios";

export async function deleteProject(project_id: string, creator_id: string) {
	console.log(project_id, creator_id);
	try {
		const response = await axios.delete(
			`http://localhost:8000/project/delete/${project_id}`,
			{
				headers: {
					"X-User-Id": creator_id,
				},
			}
		);

		if (response?.status == 200) {
			return { status: 200, message: "Project Deleted" };
		}
	} catch (error) {
		console.log("DELETE_PROJECT_ACTION_ERROR: ", error);
		return { status: 500, message: "Something went wrong" };
	}
}
