"use client"

import React, { useState } from 'react'
import { Rock_Salt } from 'next/font/google'
import { cn } from '@/app/lib/utils'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { X } from "lucide-react"
import Cookies from 'universal-cookie'
import { useRouter } from 'next/navigation'

const logo = Rock_Salt({
    weight: '400',
    subsets: ["latin"]
})

const Header = () => {

    const [showMenu, setShowMenu] = useState<boolean>(false);
    const router = useRouter();

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    const handleLogout = () => {
        const cookies = new Cookies();
        const token = cookies.remove("authenticatedToken");
        router.push('/login');
    }

    return (
        <header className='bg-gradient-to-bl from-[#ff7f50] via-[#f09c0b] to-[#ffc000] 
        mx-auto flex flex-grow items-center justify-between max-w-[1600px] 
        px-4 py-2 relative'>
            <nav className={cn(`text-3xl`, logo.className)}>
                TaskDone
            </nav>
            <nav className='flex items-center justify-between  rounded-2xl
            p-2 gap-5 text-white'>
                <div className='hidden md:flex items-center justify-between gap-4'>
                    <p
                        className='cursor-pointer md:text-lg xl:text-xl'>
                        Task Pending
                    </p>
                    <p
                        className='cursor-pointer md:text-lg xl:text-xl'>
                        Task Remaining
                    </p>
                </div>
                <Avatar onClick={handleShowMenu}>
                    <AvatarImage src="/avatar-placeholder.jpg" />
                </Avatar>
            </nav>
            {
                showMenu && (
                    <div className='absolute w-40 right-0 top-20 border border-gray-600 rounded-xl
                    bg-white z-20 p-1 flex flex-col items-start gap-2'>
                        <X
                            size={20}
                            onClick={handleShowMenu}
                            className='cursor-pointer border-b-gray-200'
                        />
                        <p
                            className='cursor-pointer px-2 w-full md:text-lg xl:text-xl'>
                            Task Pending
                        </p>
                        <p
                            className='cursor-pointer px-2 w-full md:text-lg xl:text-xl'>
                            Task Remaining
                        </p>
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