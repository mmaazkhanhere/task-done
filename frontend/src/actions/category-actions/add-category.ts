import axios from "axios";
import { uuid } from "uuidv4";

export async function add_category(title: string, userId: string) {
	const id = uuid();
	try {
		console.log({ id, title, userId });

		const response = await axios.post("http://localhost:8000/category", {
			id,
			title,
			userId,
		});

		console.log(response);

		if (response.status === 200) {
			return { status: 200, message: "Category Successfully Created" };
		} else {
			return {
				status: response.status,
				message: "Failed to create category",
			};
		}
	} catch (error: any) {
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
