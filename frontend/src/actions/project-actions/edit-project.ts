import { EditProjectData } from "@/types/interface";
import axios from "axios";

export async function editProject(
	values: EditProjectData,
	project_id: string,
	creator_id: string
) {
	try {
		const response = await axios.patch(
			`http://localhost:8000/project/edit/${project_id}`,
			values,
			{
				headers: {
					"X-User-Id": creator_id,
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			return { status: 200, message: "Category Successfully Edited" };
		}
	} catch (error) {
		console.log("[EDIT_PROJECT_ACTION_ERROR]: ", error);
		return { status: 500, message: "Something went wrong" };
	}
}
