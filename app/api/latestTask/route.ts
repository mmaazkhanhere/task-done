import { db, taskTable } from "@/app/lib/drizzle";
import { asc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server"

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
