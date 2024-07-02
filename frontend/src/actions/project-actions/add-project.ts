import { AddProjectData } from "@/types/interface";
import axios from "axios";
import { uuid } from "uuidv4";

export async function addProject(values: AddProjectData, creator_id: string) {
	const id = uuid();
	const { title, description, icon } = values;
	const category = values.category;

	console.log({ id, title, description, icon, category, creator_id });
	try {
		const response = await axios.post("http://localhost:8000/project", {
			id,
			title,
			description,
			category,
			icon,
			creator_id,
		});

		if (response?.status == 200) {
			return { status: 200, message: "Project Successfully Created" };
		} else {
			return { status: 500, message: "Something went wrong" };
		}
	} catch (error) {
		console.error("[ADD_PROJECT_ACTION_ERROR]: ", error);
	}
}
