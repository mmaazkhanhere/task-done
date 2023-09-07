import { completedTaskTable, db } from "@/lib/drizzle";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {

        const body = await request.json();

        const username = request.cookies.get("username")?.value ?? null;
        const taskCompleted = body.task_completed

        if (!username) {
            return new NextResponse("Username missing", { status: 400 })
        }

        const existingTask = await db.select({ taskCompleted: completedTaskTable })
            .from(completedTaskTable)
            .where(and(eq(completedTaskTable.task_completed, taskCompleted), eq(completedTaskTable.username, username)))

        if (existingTask.length > 0) {
            return new NextResponse("Item already deleted", { status: 400 })
        }
        else {
            const completedTask = await db.insert(completedTaskTable).values({
                username: username,
                task_completed: taskCompleted,
            })

            return NextResponse.json(completedTask);
        }

    } catch (error) {
        console.error("Error while adding completed task into the database: ", error);
    }
}