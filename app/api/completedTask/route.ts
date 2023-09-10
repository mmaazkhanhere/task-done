import { completedTaskTable, db } from "@/app/lib/drizzle";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const username = request.cookies.get("username")?.value;

        if (!username) {
            return new NextResponse("Missing username", { status: 400 });
        }
        console.log(username);

        const taskCompleted = await db.select()
            .from(completedTaskTable)
            .where(eq(completedTaskTable.username, username))

        console.log(taskCompleted);

        if (taskCompleted !== null) {
            return NextResponse.json(taskCompleted);
        }

    } catch (error) {
        console.error("Error while getting completed task in completedTask api: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const POST = async (request: NextRequest) => {
    try {

        console.log("API called");
        const body = await request.json();

        const username = request.cookies.get("username")?.value ?? null;
        const taskCompleted = body.task_completed
        console.log(taskCompleted);

        if (!username || !taskCompleted) {
            return new NextResponse("Username missing", { status: 400 })
        }

        console.log("Before insertion")
        const completedTask = await db.insert(completedTaskTable).values({
            username: username,
            task_completed: taskCompleted,
        })
        console.log("After insertion")

        return NextResponse.json(completedTask);
    } catch (error) {
        console.error("Error while adding completed task into the database: ", error);
    }
}

export const DELETE = async (request: NextRequest) => {
    try {
        const url = new URL(request.url);
        const deleteTask = url.searchParams.get("delete_task") as string;
        const username = request.cookies.get("username")?.value ?? null;

        if (!username) {
            return new NextResponse("No user available", { status: 400 });
        }

        const deletedTask = await db.delete(completedTaskTable)
            .where(and(eq(completedTaskTable.username, username), eq(completedTaskTable.task_completed, deleteTask)))
            .execute();

        return NextResponse.json(deletedTask);

    } catch (error) {
        console.error("Error while deleting task from the database: ", error);
        return new NextResponse("Error deleting task", { status: 500 });
    }
}