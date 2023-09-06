import { NextRequest, NextResponse } from "next/server";
import { db, taskTable } from "@/lib/drizzle";

export const POST = async (request: NextRequest) => {
    try {

        const body = await request.json();

        const username = request.cookies.get("username")?.value ?? null;
        console.log(username);

        const taskAdded = body.taskAdded;
        console.log(taskAdded)

        const toComplete: Date = body.toComplete;
        console.log(toComplete);

        const createdAt: Date = new Date();
        console.log(createdAt);

        if (!username || !taskAdded || !toComplete) {
            return new NextResponse("Missing details!", { status: 400 });
        }

        console.log("Before insertion")

        const newTask = db.insert(taskTable).values({
            username: username,
            taskAdded: taskAdded,
            toComplete: toComplete,
            createdAt: createdAt
        });

        console.log("After Insertion")

        return NextResponse.json({ newTask });

    } catch (error) {
        console.error("Error while posting task detail to the database: ", error);
        throw new Error("Error in POST call while adding task detail into the database");
    }
}