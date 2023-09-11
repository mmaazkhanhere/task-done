"use client"

import React, { useState } from 'react'
import { Rock_Salt } from 'next/font/google'
import { cn } from '@/app/lib/utils'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { X } from "lucide-react"
import Cookies from 'universal-cookie'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/app/store/hooks'

const logo = Rock_Salt({
    weight: '400',
    subsets: ["latin"]
})

const Header = () => {

    const [showMenu, setShowMenu] = useState<boolean>(false);

    const router = useRouter();
    const todoTask = useAppSelector(state => state.todoTasks.task.length);
    const pendingTask = useAppSelector(state => state.pendingTask.pending.length)

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    const handleLogout = () => {
        const cookies = new Cookies();
        const token = cookies.remove("authenticatedToken");
        router.push('/login');
    }

    return (
        <header className='mx-auto flex flex-grow items-center justify-between max-w-[1600px] 
        px-4 py-2 relative shadow-sm bg-gradient-to-bl from-[#ff7f50] via-[#f39e0c] to-[#ffc000] w-full'>
            <nav className={cn(`text-3xl`, logo.className)}>
                TaskDone
            </nav>
            <nav className='flex items-center justify-between  rounded-2xl
            p-2 gap-5 text-white relative'>
                <div className='hidden md:flex items-center justify-between gap-4'>
                    <p
                        className='cursor-pointer md:text-lg xl:text-xl '>
                        Task Pending
                    </p>
                    {
                        pendingTask > 0 && (
                            <p className='absolute top-0 left-24 bg-white text-orange-500 w-5 h-5 rounded-full
                            flex items-center justify-center'>
                                {pendingTask}
                            </p>
                        )
                    }
                    <p
                        className='cursor-pointer md:text-lg xl:text-xl'>
                        Task Remaining
                    </p>
                    {
                        todoTask > 0 && (
                            <p className='absolute top-0 right-16 flex items-center justify-center 
                            bg-white text-orange-500 w-5 h-5 rounded-full'>
                                {todoTask}
                            </p>
                        )

                    }
                </div>
                <Avatar onClick={handleShowMenu}>
                    <AvatarImage src="/avatar-placeholder.jpg" />
                </Avatar>
            </nav>
            {
                showMenu && (
                    <div className='absolute w-40 right-0 top-20 border border-gray-600 rounded-xl
                    bg-white z-20 p-1 flex flex-col items-start gap-2 '>
                        <X
                            size={20}
                            onClick={handleShowMenu}
                            className='cursor-pointer border-b-gray-200'
                        />
                        <p
                            className='cursor-pointer px-2 w-full md:text-lg xl:text-xl
                            relative'>
                            Task Pending
                        </p>
                        {
                            pendingTask && (
                                <p className='absolute top-9 left-[110px] bg-orange-500 text-white w-5 h-5 rounded-full
                            flex items-center justify-center'>
                                    {pendingTask}
                                </p>
                            )
                        }
                        <p
                            className='cursor-pointer px-2 w-full md:text-lg xl:text-xl relative'>
                            Task Remaining
                        </p>
                        {
                            todoTask && (
                                <p className='absolute top-16 left-[150px] bg-orange-500 text-white w-5 h-5 rounded-full
                                flex items-center justify-center'>
                                    {todoTask}
                                </p>
                            )
                        }
                        <p
                            onClick={handleLogout}
                            className='cursor-pointer px-2 w-full md:text-lg xl:text-xl'>
                            Logout
                        </p>
                    </div>
                )
            }
        </header>
    )
}

export default Header