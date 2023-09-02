import React from 'react'
import { Rock_Salt } from 'next/font/google'
import { cn } from '@/lib/utils'
import AuthForm from './components/AuthForm'

const font = Rock_Salt({
    weight: '400',
    subsets: ["latin"]
})

const Home = () => {
    return (
        <main className='bg-gradient-to-bl from-[#ff7f50] via-[#ffac1c] to-[#ffc000] w-full h-screen'>
            <div className='flex items-center justify-center w-full h-full'>
                <div className='flex flex-col items-center justify-center bg-white rounded-lg 
                w-full md:max-w-lg mx-auto gap-4'>
                    <h1 className={cn(`text-7xl`, font.className)}>TaskDone</h1>
                    <h2 className='text-2xl mt-3'>Sign in to your account</h2>
                </div>
            </div>
            <AuthForm />
        </main>
    )
}

export default Home