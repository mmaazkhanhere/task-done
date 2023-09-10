import { db, pendingTaskTable } from "@/app/lib/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        console.log("Get api called");
        const username = request.cookies.get("username")?.value ?? null;
        if (!username) {
            return new NextResponse("Missing details", { status: 400 });
        }
        console.log(username);

        console.log("Before selection")
        const res = await db.select().from(pendingTaskTable)
            .where(eq(pendingTaskTable.username, username));

        console.log("After selection");
        console.log(res);
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

        const newPending = await db.insert(pendingTaskTable).values({
            username: username,
            task_pending: pending,
            due_date: date
        })
        return NextResponse.json({ newPending });

    } catch (error) {
        console.error("Error in the POST api call of pendingTask");
    }
}
