import { db, pendingTaskTable } from "@/app/lib/drizzle";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const username = request.cookies.get("username")?.value ?? null;
        if (!username) {
            return new NextResponse("Missing details", { status: 400 });
        }

        const res = await db.select().from(pendingTaskTable)
            .where(eq(pendingTaskTable.username, username));

        return NextResponse.json(res);
    } catch (error) {
        console.error("Error in GET API call for getting pending task: ", error);
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const username = request.cookies.get("username")?.value ?? null;

        const body = await request.json();
        const pending = body.pending_task;
        const date = body.due_date;

        if (!username || !pending || !date) {
            return new NextResponse("Missing details", { status: 400 });
        }

        const existing = await db.select({ pending: pendingTaskTable.task_pending, date: pendingTaskTable.due_date })
            .from(pendingTaskTable)
            .where(eq(pendingTaskTable.username, username))
            .limit(1);

        if (existing.length > 0) {
            return new NextResponse("Item already present!", { status: 404 });
        }
        else {
            const newPending = await db.insert(pendingTaskTable).values({
                username: username,
                task_pending: pending,
                due_date: date
            })
            return NextResponse.json({ newPending });
        }

    } catch (error) {
        console.error("Error in the POST api call of pendingTask");
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

        const deletedTask = await db.delete(pendingTaskTable)
            .where(and(eq(pendingTaskTable.username, username), eq(pendingTaskTable.task_pending, deleteTask)))
            .execute();

        return NextResponse.json(deletedTask);

    } catch (error) {
        console.error("Error while deleting pending task from the database: ", error);
        return new NextResponse("Error deleting task", { status: 500 });
    }
}
