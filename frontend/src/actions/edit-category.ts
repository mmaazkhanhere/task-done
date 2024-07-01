import axios from "axios";

export async function editCategory(
	categoryId: string,
	userId: string,
	title: string
) {
	try {
		const response = await axios.patch(
			`http://localhost:8000/category/edit/${categoryId}`,
			{ title }, // Request body
			{
				headers: {
					"X-User-Id": userId,
					"Content-Type": "application/json", // Ensure the content type is set
				},
			}
		);

		if (response.status === 200) {
			return { status: 200, message: "Category Successfully Edited" };
		}
	} catch (error) {
		console.error(`[CATEGORIES_EDIT_ERROR]: `, error);
		return { status: 500, message: "Something went wrong" };
	}
}
