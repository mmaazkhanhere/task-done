import axios from "axios";

export async function deleteCategory(userId: string, categoryId: string) {
	try {
		console.log("try");
		const response = await axios.delete(
			`http://localhost:8000/category/delete/${categoryId}`,
			{
				headers: {
					"X-User-Id": userId,
				},
			}
		);
		console.log("checked");
		console.log(response?.status);

		if (response?.status == 200) {
			return { status: 200, message: "Category Deleted" };
		}
	} catch (error) {
		console.error("DELETE_CATEGORY_ACTION_ERROR: ", error);
		return { status: 500, message: "Something went wrong" };
	}
}
