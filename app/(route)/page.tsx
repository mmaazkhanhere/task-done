"use client"

import { useAuth } from '@/hooks/useAuth';
import React, { useEffect, useState } from 'react'
import AddToDo from './components/AddToDo';
import Header from './components/Header';
import { JWTPayload } from 'jose';



const Home = () => {

    const [auth, setAuth] = useState<JWTPayload | null>();

    useEffect(() => {
        const fetchAuthStatus = async () => {
            const authStatus = await useAuth.fromServer();
            setAuth(authStatus);
        }
        fetchAuthStatus();
    }, [auth]);

    return (
        <section>
            {
                auth === null && (
                    <div>
                        <Header />
                        <AddToDo />
                    </div>
                )
            }

        </section>
    )
}

export default Home