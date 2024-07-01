import { revalidatePath } from "next/cache";
import axios from "axios";
import { uuid } from "uuidv4";

export async function add_category(title: string, userId: string) {
	const id = uuid();

	console.log({ id, title, userId });

	try {
		const response = await axios.post("http://localhost:8000/category", {
			id,
			title,
			userId,
		});

		revalidatePath("/category");

		if (response.data) {
			return { status: 200, message: "Category Successfully Created" };
		} else {
			return { status: 400, message: "Failed to create category" };
		}
	} catch (error) {
		return { status: 500, message: "Something went wrong" };
	}
}
