import axios from "axios";

export async function getUsersData(userId: string) {
	try {
		const response = await axios.get(
			`http://localhost:8000/api/user/${userId}`
		);
		if (response?.status == 200) {
			return response.data;
		}
	} catch (error) {
		console.log(`USER_DETAIL_FETCH_ACTION_ERROR: `, error);
		return { status: 500, message: "Something went wrong!" };
	}
}
