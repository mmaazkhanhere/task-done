import { db, userTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const hashedPassword = await bcrypt.hash(body.user_password, 12);

        console.log(body.username);

        if (!body.username || !body.customer_name || !body.email || !body.user_password) {
            return new NextResponse("Missing Information", { status: 400 })
        }


        // console.log("Before db.select()");
        // const existingUser = await db.select({ username: body.username })
        //     .from(userTable)
        //     .where(eq(userTable.username, body.username))
        //     .limit(1);
        // console.log("After db.select()");

        console.log("Before db.insert()");
        const newUser = await db.insert(userTable).values({
            customer_name: body.customer_name,
            username: body.username,
            email: body.email,
            user_password: hashedPassword
        });
        console.log("After db.insert()");
        return NextResponse.json({ newUser });
    } catch (error) {
        console.error("Error while posting user details: ", error);
        throw new Error("Cannot post user details");
    }
}