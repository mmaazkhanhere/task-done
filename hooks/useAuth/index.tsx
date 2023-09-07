import Cookies from "universal-cookie"
import React from "react";
import { JWTPayload } from "jose";
import { verifyJwtToken } from "@/app/lib/auth";

const fromServer = async () => {
    const cookies = new Cookies();
    const authenticatedToken = cookies.get("authenticatedToken") ?? null;
    const verifiedToken = await verifyJwtToken(authenticatedToken);
    return verifiedToken
}

export function useAuth() {
    const [auth, setAuth] = React.useState<JWTPayload | null>(null);

    const getVerifiedToken = async () => {
        const cookies = new Cookies();
        const token = cookies.get("authenticatedToken") ?? null;
        console.log(token);
        const verifiedToken = await verifyJwtToken(token);
        setAuth(verifiedToken);
    };

    React.useEffect(() => {
        getVerifiedToken();
    }, [])

    return auth;
}

useAuth.fromServer = fromServer;