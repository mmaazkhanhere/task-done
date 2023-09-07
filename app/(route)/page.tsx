"use client"

import { useAuth } from '@/hooks/useAuth';
import React, { useEffect, useState } from 'react'
import AddToDo from './components/AddToDo';
import Header from './components/Header';
import { JWTPayload } from 'jose';
import ComingUpNext from './components/ComingUpNext';


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
        <div>
            {
                auth === null && (
                    <main>
                        <Header />
                        <AddToDo />
                        <div>
                            <ComingUpNext />
                        </div>
                    </main>
                )
            }

        </div>
    )
}

export default Home