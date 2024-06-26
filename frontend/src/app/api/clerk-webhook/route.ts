import { IncomingHttpHeaders } from "http";
import axios from "axios";
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
	console.log(eventType);

	try {
		if (eventType === "user.created") {
			await handleUserSignup(evt.data);
		} else if (eventType === "user.updated") {
			await handleUserUpdate(evt.data);
		} else if (eventType === "user.deleted") {
			await handleUserDelete(evt.data);
		}
	} catch (error) {
		console.error("Error handling webhook event:", error);
		return new Response("Error handling webhook event", { status: 500 });
	}

	return new Response("Successful creation", { status: 200 });
}

async function handleUserSignup(userData: any) {
	console.log(userData);

	const full_name: string = userData.first_name + " " + userData.last_name;
	const id = userData.id;
	const name = full_name;
	const username = userData.username;
	const email = userData.email_addresses[0].email_address;

	const requestData = {
		id,
		name,
		username,
		email,
	};

	try {
		const response = await axios.post(
			"http://localhost:8000/sign-up",
			requestData
		);
	} catch (error) {
		console.error("Error inserting user data:", error);
		throw error;
	}
}

async function handleUserUpdate(userData: any) {
	const full_name: string = userData.first_name + " " + userData.last_name;
	const name = full_name;
	const username = userData.username;
	const email = userData.email_addresses[0].email_address;

	const requestData = {
		name,
		username,
		email,
	};

	try {
		const response = await axios.patch(
			`http://localhost:8000/user/update/${userData.id}`,
			requestData
		);
	} catch (error) {
		console.error("Error updating user data:", error);
		throw error;
	}
}

async function handleUserDelete(userData: any) {
	try {
		const response = await axios.delete(
			`http://localhost:8000/user/delete/${userData.id}`,
			userData
		);
	} catch (error) {
		console.error("Error deleting user:", error);
	}
}
