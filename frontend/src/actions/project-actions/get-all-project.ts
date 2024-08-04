import axios from "axios";

export async function getAllProject(creator_id: string) {
	try {
		const response = await axios.get(`http://localhost:8000/project/all/`, {
			headers: {
				"X-User-Id": creator_id,
			},
		});

		if (response?.status == 200) {
			return response.data;
		} else {
			return { status: 500, message: "Something went wrong" };
		}
	} catch (error) {
		console.error(`[GET_ALL_PROJECTS_API_ERROR]: `, error);
	}
}
