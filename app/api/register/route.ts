import { db, userTable } from "@/lib/drizzle";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { SignJWT } from "jose"
import { getSecretKey } from "@/lib/auth"

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();

        const hashedPassword: string = await new Promise((resolve, reject) => {
            bcrypt.hash(body.user_password, 12, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
        console.log(hashedPassword);

        const username = body.username;
        const email = body.email;

        if (!body.username || !body.customer_name || !body.email || !body.user_password) {
            return new NextResponse("Missing Information", { status: 406 })
        }

        const existingUser = await db.select({ username: userTable.username })
            .from(userTable)
            .where(and(eq(userTable.username, username), eq(userTable.email, email)))
            .limit(1);

        if (existingUser.length > 0) {
            return new NextResponse("User already exists", { status: 409 })
        }
        else {
            const newUser = await db.insert(userTable).values({
                customer_name: body.customer_name,
                username: body.username,
                email: body.email,
                user_password: hashedPassword
            });

            const token = await new SignJWT({
                username: username,
                role: 'user'
            })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt(new Date().getTime())
                .setExpirationTime('30m')
                .sign(getSecretKey())

            const response = NextResponse.json({ newUser });

            response.cookies.set({
                name: 'authenticationToken',
                value: token,
                path: '/'
            })

            return response;
        }
    } catch (error) {
        console.error("Error while posting user details: ", error);
        throw new Error("Cannot post user details");
    }
}