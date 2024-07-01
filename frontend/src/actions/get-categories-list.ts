import axios from "axios";

export const getCategoriesList = async (userId: string) => {
	try {
		const response = await axios.get(`http://localhost:8000/category`);

		const responseData = await response.data();

		if (response?.status === 200) {
			return { status: 200, message: response.data };
		} else {
			return { status: 500, message: "Something went wrong" };
		}
	} catch (error) {
		return { status: 500, message: "Something went wrong" };
	}
};
