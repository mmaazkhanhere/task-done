import axios from "axios";

export async function editCategory(
	categoryId: string,
	userId: string,
	title: string
) {
	try {
		const response = await axios.patch(
			`http://localhost:8000/api/category/edit/${categoryId}`,
			{ title }, // Request body
			{
				headers: {
					"X-User-Id": userId,
					"Content-Type": "application/json", // Ensure the content type is set
				},
			}
		);

		console.log(response.status);

		if (response.status === 200) {
			return { status: 200, message: "Category Successfully Edited" };
		}
	} catch (error) {
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
