import { jwtVerify } from "jose";

export const getSecretKey=()=>{
    const secretKey=process.env.JWT_SECRET_KEY;

    if(!secretKey){
        throw new Error("JWT secret key is not matched")
    }

    return new TextEncoder().encode(secretKey);
}

export const verfiyJwtToken=async()=>{
    try {
        const {payload}=await jwtVerify(token,getSecretKey());
        return payload;
    } catch (error) {
        console.error("Error while verifying the jwt token: ",error)
    }
}