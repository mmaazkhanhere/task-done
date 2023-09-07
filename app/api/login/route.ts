import { db, userTable } from "@/app/lib/drizzle";
import { and, eq } from "drizzle-orm";
import { SignJWT } from "jose";
import bcrypt from 'bcrypt';
import { NextResponse, NextRequest } from "next/server";
import { getSecretKey } from "@/app/lib/auth"


export const GET = async (request: NextResponse) => {
    try {

        const url = new URL(request.url);
        const username = url.searchParams.get("username");
        const password = url.searchParams.get("password");

        if (!username || !password) {
            return new NextResponse('Missing details', { status: 406 })
        }

        const existingUser = await db.select({ username: userTable.username, password: userTable.user_password })
            .from(userTable)
            .where(and(eq(userTable.username, username)))
            .limit(1);


        if (existingUser.length > 0) {

            const { password: hashedPasswordFromDB } = existingUser[0];

            const passwordMatch = await new Promise((resolve, reject) => {
                bcrypt.compare(password, hashedPasswordFromDB, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            console.log(passwordMatch);

            if (!passwordMatch) {
                return new NextResponse("Incorrect password", { status: 401 });
            }
        }

        if (existingUser.length == 0) {
            return new NextResponse("User does not exists", { status: 404 })
        }
        else {
            const token = await new SignJWT({
                username: existingUser[0].username,
                role: 'user'
            })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt(new Date().getTime())
                .setExpirationTime('1h')
                .sign(getSecretKey())

            const response = NextResponse.json({ existingUser })

            response.cookies.set({
                name: 'authenticatedToken',
                value: token,
                path: '/'
            })

            response.cookies.set({
                name: 'username',
                value: username,
                path: '/'
            })

            return response;
        }

    } catch (error) {
        console.error("Following error in getting user details api call: ", error)
    }
}