import { db, taskTable } from "@/app/lib/drizzle";
import { and, asc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const username = request.cookies.get("username")?.value;
        if (!username) {
            return new NextResponse("Missing username", { status: 400 });
        }
        const taskToComplete = await db.select()
            .from(taskTable)
            .where(eq(taskTable.username, username))
            .orderBy(asc(taskTable.due_date))
            .limit(1);

        return NextResponse.json(taskToComplete);
    } catch (error) {
        console.error("Error while getting task in addTask api: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const POST = async (request: NextRequest) => {
    try {

        const body = await request.json();

        const username = request.cookies.get("username")?.value ?? null;
        console.log(body.due_date)

        if (!username || !body.task_added || !body.due_date) {
            return new NextResponse("Missing Information", { status: 400 })
        }
        const newTask = await db.insert(taskTable).values({
            username: username,
            task_added: body.task_added,
            due_date: body.due_date
        })

        const response = NextResponse.json({ newTask });
        return response;

    } catch (error) {
        console.error("Error while posting user details: ", error);
        throw new Error("Cannot post user details");
    }
}

export const PATCH = async (request: NextRequest) => {
    try {

        const username = request.cookies.get("username")?.value ?? null;

        const body = await request.json();

        const newTask = body.task_name;
        const newDate = body.new_date;

        if (!username || !newTask || !newDate) {
            return new NextResponse("Missing Information", { status: 400 })
        }

        await db.update(taskTable)
            .set({ task_added: newTask, due_date: newDate })
            .where(and(eq(taskTable.username, username)))
            .execute();

        const updatedTask = await db.select()
            .from(taskTable)
            .where(and(eq(taskTable.task_added, newTask), eq(taskTable.due_date, newDate)))
            .execute();

        return NextResponse.json(updatedTask[0]);

    } catch (error) {

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

        const deletedTask = await db.delete(taskTable)
            .where(and(eq(taskTable.username, username), eq(taskTable.task_added, deleteTask)))
            .execute();

        return NextResponse.json(deletedTask);
    } catch (error) {
        console.error("Error while deleting task from the database: ", error);
        return new NextResponse("Error deleting task", { status: 500 });
    }
}
