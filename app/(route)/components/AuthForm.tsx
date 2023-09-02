import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/router'


const AuthForm = () => {

    const session = useSession();
    const router = useRouter();

    type VariantType = 'LOGIN' | 'Register';

    const [variant, setVariant] = useState<VariantType>("LOGIN")

    return (
        <div>AuthForm</div>
    )
}

export default AuthForm