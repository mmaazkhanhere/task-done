import { revalidatePath } from "next/cache";

export async function add_category(category: string) {
	try {
		const request = await fetch("http://localhost:8000/category/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title: category }),
		});
		revalidatePath("/category");

		const response = await request.json();
		if (response.content) {
			revalidatePath("/category");
			return { status: 200, message: "Category Successfully Created" };
		} else {
			return { status: 400, message: "Failed to create category" };
		}
	} catch (error) {
		return { status: 500, message: "Something went wrong" };
	}
}
