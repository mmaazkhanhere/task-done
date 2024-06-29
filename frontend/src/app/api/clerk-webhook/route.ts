import { IncomingHttpHeaders } from "http";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";
import axios from "axios";

type EventType = "user.created" | "user.updated" | "user.deleted" | "*";

type Event = {
	data: Record<string, string | number>;
	object: "event";
	type: EventType;
};

export async function POST(request: Request) {
	const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET; /*retrieve the 
    clerk webhook secret from the environment variables */
	console.log(WEBHOOK_SECRET);

	if (!WEBHOOK_SECRET) {
		throw new Error(
			"Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
		);
	}
	console.log("checled");

	const payload = await request.json(); //get the payload from the request

	console.log(payload);

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

	console.log("checked");

	const eventType: EventType = evt.type;
	console.log(eventType);

	try {
		console.log("try");
		if (eventType === "user.created") {
			await handleUserSignup(evt.data);
		}
		console.log("try completed");
	} catch (error) {
		console.error("Error handling webhook event:", error);
		return new Response("Error handling webhook event", { status: 500 });
	}

	return new Response("Successful creation", { status: 200 });
}

async function handleUserSignup(userData: any) {
	const full_name: string = userData.first_name + " " + userData.last_name;
	console.log(full_name);

	const id = userData.id;
	console.log(id);

	const name = full_name;
	console.log(name);

	const username = userData.username;
	console.log(username);

	const email = userData.email_addresses[0].email_address;
	console.log(email);

	const requestData = {
		id,
		name,
		username,
		email,
	};

	console.log(requestData);

	try {
		const request = await axios.post("http://localhost:8000/sign-up/", {
			requestData,
		});

		console.log(request);

		revalidatePath("/sign-up");

		const data = await request.data();

		console.log(data);

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
