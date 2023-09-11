import { completedTaskTable, db } from "@/app/lib/drizzle";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    try {
        const username = request.cookies.get("username")?.value;
        if (!username) {
            return new NextResponse("Missing details!", { status: 400 });
        }
        const tasks = await db.select().from(completedTaskTable).where(eq(completedTaskTable.username, username));
        return NextResponse.json(tasks);
    } catch (error) {
        console.error("Error in the GET API call to get all completed task: ", error);
    }
};

export const POST = async (request: NextRequest) => {
    try {
        const data = await request.json();
        const username = request.cookies.get("username")?.value;

        if (!username || !data.task_added || !data.task_added) {
            return new NextResponse("Missing details", { status: 400 });
        }

        const addTask = await db.insert(completedTaskTable).values({
            username: username,
            task_completed: data.task_added
        });

        return NextResponse.json({ addTask });

    } catch (error) {
        console.log("Error in the POST API of completedTask api: ", error);
    }
};

export const DELETE = async (request: NextRequest) => {
    try {
        const task = request.nextUrl.searchParams.get("delete_task") as string;
        const username = request.cookies.get("username")?.value ?? null;

        if (!task || !username) {
            return new NextResponse("Missing details", { status: 400 });
        }

        const res = await db.delete(completedTaskTable)
            .where(and(eq(completedTaskTable.task_completed, task), eq(completedTaskTable.username, username)));

        return NextResponse.json(res);

    } catch (error) {
        console.error("Error in the DELETE API request of completedTask for deleteing task: ", error);
    }
};