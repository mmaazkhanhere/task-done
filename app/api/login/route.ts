import { NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcrypt'; // Import bcrypt or your password hashing library here
import { db, userTable } from '@/app/lib/drizzle';
import { eq } from 'drizzle-orm';
import { SignJWT } from 'jose';
import { getSecretKey } from '@/app/lib/auth';

export const GET = async (request: NextRequest) => {
    try {
        const username = request.nextUrl.searchParams.get("username") ?? null;
        const password = request.nextUrl.searchParams.get("password") ?? null;

        if (!username || !password) {
            return new NextResponse('Missing details', { status: 406 });
        }

        const existingUser = await db.select({ username: userTable.username, password: userTable.user_password })
            .from(userTable)
            .where(eq(userTable.username, username)) // Use username directly from the query
            .limit(1);

        if (existingUser.length === 0) {
            return new NextResponse("User does not exist", { status: 404 });
        }

        const { password: hashedPasswordFromDB } = existingUser[0];

        const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDB);

        if (!passwordMatch) {
            return new NextResponse("Incorrect password", { status: 401 });
        }

        const token = await new SignJWT({
            username: existingUser[0].username,
            role: 'user',
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt(new Date().getTime())
            .setExpirationTime('1h')
            .sign(getSecretKey());

        const response = new NextResponse(JSON.stringify({ existingUser }));

        response.cookies.set({
            name: 'authenticatedToken',
            value: token,
            path: '/',
        });

        response.cookies.set({
            name: 'username',
            value: username,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error("Following error in getting user details API call: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
