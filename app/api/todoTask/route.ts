import { db, taskTable } from "@/app/lib/drizzle";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    try {
        const username = request.cookies.get("username")?.value;
        if (!username) {
            return new NextResponse("Missing details!", { status: 400 });
        }
        const tasks = await db.select().from(taskTable).where(eq(taskTable.username, username));
        return NextResponse.json(tasks);
    } catch (error) {
        console.error("Error in the GET API call to get all tasks: ", error);
    }
};

export const POST = async (request: NextRequest) => {
    try {
        const data = await request.json();
        const username = request.cookies.get("username")?.value;

        if (!username || !data.task_added || !data.task_added) {
            return new NextResponse("Missing details", { status: 400 });
        }

        const addTask = await db.insert(taskTable).values({
            username: username,
            task_added: data.task_added,
            due_date: data.due_date
        });

        return NextResponse.json({ addTask });

    } catch (error) {
        console.log("Error in the POST API of todoTask: ", error);
    }
};

export const DELETE = async (request: NextRequest) => {
    try {
        const task = request.nextUrl.searchParams.get("delete_task") as string;
        const username = request.cookies.get("username")?.value ?? null;

        if (!task || !username) {
            return new NextResponse("Missing details", { status: 400 });
        }

        const res = await db.delete(taskTable)
            .where(and(eq(taskTable.task_added, task), eq(taskTable.username, username)));

        return NextResponse.json(res);

    } catch (error) {
        console.error("Error in the DELETE API request of todoTask for deleteing task: ", error);
    }
};

export const PATCH = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const updatedTask = body.new_task;
        const updatedTime = body.new_date;
        console.log(updatedTask);
        const username = request.cookies.get("username")?.value ?? null;

        if (!username || !updatedTime || !updatedTask) {
            return new NextResponse("Missing details", { status: 400 });
        }

        await db.update(taskTable)
            .set({ task_added: updatedTask, due_date: updatedTime })
            .where(and(eq(taskTable.username, username)))
            .execute();

        const task = await db.select()
            .from(taskTable)
            .where(and(eq(taskTable.task_added, updatedTask), eq(taskTable.username, username)))
            .execute();

        return NextResponse.json(task[0]);

    } catch (error) {
        console.error("Error in the PATCH API request of todoTask: ", error);
    }
}
