import { db, taskTable } from "@/lib/drizzle";
import { asc, eq } from "drizzle-orm";
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
        const newUser = await db.insert(taskTable).values({
            username: username,
            task_added: body.task_added,
            due_date: body.due_date
        })

        const response = NextResponse.json({ newUser });
        return response;

    } catch (error) {
        console.error("Error while posting user details: ", error);
        throw new Error("Cannot post user details");
    }
}