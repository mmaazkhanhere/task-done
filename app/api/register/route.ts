import { NextRequest, NextResponse } from "next/server";

// export const GET=async(request:NextRequest)=>{
//     try {

//     } catch (error) {
//         console.error("Error while fetching username for login: ", error);
//         throw new Error("Cannot get username for login!");
//     }
// }

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { name, username, email, password } = body;

    } catch (error) {
        console.error("Error while posting user details: ", error);
        throw new Error("Cannot post user details");
    }
}