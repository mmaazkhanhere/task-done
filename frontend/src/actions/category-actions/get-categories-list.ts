import axios from "axios";

export const getCategoriesList = async (userId: string) => {
	try {
		const response = await axios.get(
			`http://localhost:8000/category/all/`,
			{
				headers: {
					"X-User-Id": userId,
				},
			}
		);

		const data = response.data;
		return data;
	} catch (error) {
		return { status: 500, message: "Something went wrong" };
	}
};
