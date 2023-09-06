import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();

        const taskName = body.taskName;
        console.log(taskName);
        const time = body.time;
        console.log(time);

    } catch (error) {
        console.error("Error while posting task detail to the database: ", error);
        throw new Error("Error in POST call while adding task detail into the database");
    }
}