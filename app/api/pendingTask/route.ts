import { db, pendingTaskTable } from "@/app/lib/drizzle";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    try {
        const username = request.cookies.get("username")?.value;
        if (!username) {
            return new NextResponse("Missing details!", { status: 400 });
        }
        const tasks = await db.select().from(pendingTaskTable).where(eq(pendingTaskTable.username, username));

        return NextResponse.json(tasks);

    } catch (error) {
        console.error("Error in the GET API call to pending task: ", error);
    }
};

export const POST = async (request: NextRequest) => {
    try {
        const data = await request.json();
        const username = request.cookies.get("username")?.value;

        if (!username || !data.pending_task || !data.pending_date) {
            return new NextResponse("Missing details", { status: 400 });
        }

        const existingTask = await db.select()
            .from(pendingTaskTable)
            .where(and(eq(pendingTaskTable.username, username), eq(pendingTaskTable.task_pending, data.pending_task)));

        if (existingTask) {
            return new NextResponse("Task already present", { status: 406 });
        } else {
            const addPending = await db.insert(pendingTaskTable).values({
                username: username,
                task_pending: data.pending_task,
                due_date: data.pending_date
            });

            return NextResponse.json({ addPending });
        }

    } catch (error) {
        console.log("Error in the POST API of pending task: ", error);
    }
};


export const DELETE = async (request: NextRequest) => {
    try {
        const task = request.nextUrl.searchParams.get("delete_task") as string;
        const username = request.cookies.get("username")?.value ?? null;

        if (!task || !username) {
            return new NextResponse("Missing details", { status: 400 });
        }


        const res = await db.delete(pendingTaskTable)
            .where(and(eq(pendingTaskTable.task_pending, task), eq(pendingTaskTable.username, username)));

        return NextResponse.json(res);

    } catch (error) {
        console.error("Error in the DELETE API request of todoTask for deleteing task: ", error);
    }
};