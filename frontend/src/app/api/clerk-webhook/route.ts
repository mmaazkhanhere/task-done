/*An api endpoint to receive webhook events from the Clerk and do database queries 
using prisma accordingly, ensuring that the data is synchronized between the
Clerk and database */

import { IncomingHttpHeaders } from "http";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

type EventType = "user.created" | "user.updated" | "user.deleted" | "*";

type Event = {
	data: Record<string, string | number>;
	object: "event";
	type: EventType;
};

export async function POST(request: Request) {
	const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET; /*retrieve the 
    clerk webhook secret from the environment variables */

	if (!WEBHOOK_SECRET) {
		throw new Error(
			"Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
		);
	}

	const payload = await request.json(); //get the payload from the request

	const headersList = headers();
	const heads = {
		"svix-id": headersList.get("svix-id"),
		"svix-timestamp": headersList.get("svix-timestamp"),
		"svix-signature": headersList.get("svix-signature"),
	}; //extract the required headers from the request

	const wh = new Webhook(WEBHOOK_SECRET); //create new webhook

	let evt: Event | null = null;

	try {
		//verify the webhook payload using th webhook instance and extracted headers
		evt = wh.verify(
			JSON.stringify(payload),
			heads as IncomingHttpHeaders & WebhookRequiredHeaders
		) as Event;
	} catch (error) {
		console.error("CLERK_WEBHOOK_ERROR", error);
		return NextResponse.json("CLERK_WEBHOOK_ERROR", { status: 400 });
	}

	const eventType: EventType = evt.type;

	try {
		/*if the event type is creating user, call the handleUserSignUp function
        that creates a new user and insert in the database */
		if (eventType === "user.created") {
			await handleUserSignup(evt.data);
		}
	} catch (error) {
		console.error("Error handling webhook event:", error);
		return new Response("Error handling webhook event", { status: 500 });
	}

	return new Response("", { status: 200 });
}

async function handleUserSignup(userData: any) {
	try {
		const request = await fetch("http://localhost:8000/sign-up", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userData,
			}),
		});
		revalidatePath("/sign-up");
		const data = await request.json();
		if (data) {
			revalidatePath("/");
			return { status: "success", message: "User created successfully" };
		} else {
			return { status: "error", message: "Something went wrong" };
		}
	} catch (error) {
		console.error("Error inserting user data:", error);
		throw error;
	}
}
