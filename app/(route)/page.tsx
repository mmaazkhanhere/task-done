"use client"

import { useAuth } from '@/hooks/useAuth';
import React, { useEffect, useState } from 'react'
import AddToDo from './components/AddToDo';
import Header from './components/Header';
import { JWTPayload } from 'jose';
import ComingUpNext from './components/ComingUpNext';
import TodoTask from './components/TodoTask';
import TaskPending from './components/TaskPending';


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
                        <ComingUpNext />
                        <TaskPending />
                        <TodoTask />
                    </main>
                )
            }

        </div>
    )
}

export default Home