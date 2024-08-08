import axios from "axios";

export async function getSpecificCategory(categoryId: string, userId: string) {
	try {
		const response = await axios.get(
			`http://localhost:8000/api/category/${categoryId}`,
			{
				headers: {
					"X-User-Id": userId,
				},
			}
		);

		const categoryData = response.data;
		return categoryData;
	} catch (error) {
		console.log("[GET_SPECIFIC_CATEGORY_ERROR]", error);
	}
}
