import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import React from 'react'

const Home = async () => {
    const auth = await useAuth.fromServer();
    console.log(auth)
    return (
        <section>
            <nav className="flex items-center justify-center gap-10">
                <div className="text-2xl font-bold">
                    <Link href="/">Logo</Link>
                </div>
                <div className="text-2xl">
                    {auth ? (
                        <Link href="/wallet">Create Wallet</Link>
                    ) : (
                        <div className="flex items-center justify-center gap-10">
                            <Link href="/login">Login</Link>
                            <Link href="/register">Register</Link>
                        </div>
                    )}
                </div>
            </nav>

        </section>
    )
}

export default Home