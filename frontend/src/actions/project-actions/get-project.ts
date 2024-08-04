import axios from "axios";

export async function getProject(project_id: string, creator_id: string) {
	console.log(project_id, creator_id);
	try {
		const response = await axios.get(
			`http://localhost:8000/project/${project_id}`,
			{
				headers: {
					"X-User-Id": creator_id,
				},
			}
		);

		const projectData = response.data;
		return projectData;
	} catch (error) {
		console.log("GET_PROJECT_ACTION_ERROR: ", error);
		return { status: 500, message: "Internal Server Error" };
	}
}
