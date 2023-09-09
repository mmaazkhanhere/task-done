import { db, pendingTaskTable } from "@/app/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const username = request.cookies.get("username")?.value ?? null;
        const body = await request.json();
        if (!username || !body.pending_task || !body.due_date) {
            return new NextResponse("Missing details", { status: 400 });
        }

        const newTask = await db.insert(pendingTaskTable).values({
            username: username,
            task_pending: body.pending_task,
            due_date: body.due_date
        });

        return NextResponse.json(newTask);
    } catch (error) {
        console.error("Error in the POST api call of pendingTask");
    }
}