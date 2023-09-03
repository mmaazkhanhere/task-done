"use client"

import React, { useState } from 'react'
import { Rock_Salt } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


const logo = Rock_Salt({
    weight: '400',
    subsets: ["latin"]
})

type VariantType = 'Login' | 'Register'

const Login = () => {

    const [variant, setVariant] = useState<VariantType>('Login')
    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const toggleVariant = () => {
        if (variant === 'Login') {
            setVariant('Register')
        } else {
            setVariant('Login')
        }
    }

    return (
        <div className='flex items-center justify-center w-full h-full'>
            {
                variant === 'Login' && (
                    <div className='flex flex-col items-start justify-center'>
                        <h1 className={cn(`text-6xl lg:text-7xl`, logo.className)}>TaskDone</h1>
                        <div className='flex flex-col items-start justify-center bg-white rounded-lg 
                        w-full md:max-w-xl mx-auto gap-5 mt-10 p-8'>
                            <h2 className='text-lg mt-3 self-center'>Sign in to your account</h2>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <span>Username</span>
                                <Input type='text' value={username} />
                            </div>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <p>Password</p>
                                <Input type='password' value={password} />
                            </div>
                            <Button type='submit' variant='signin' >
                                Login
                            </Button>
                            <div className='flex flex-col lg:flex-row gap-2 lg:gap-0 items-center justify-between 
                            text-[14px] w-full text-gray-600'>
                                <h2>New to TaskDone?</h2>
                                <span className='underline cursor-pointer'
                                    onClick={toggleVariant}
                                >
                                    Register yourself with us
                                </span>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                variant === 'Register' && (
                    <div className='flex flex-col items-start justify-center'>
                        <h1 className={cn(`text-6xl lg:text-7xl`, logo.className)}>TaskDone</h1>
                        <div className='flex flex-col items-start justify-center bg-white rounded-lg 
                        w-full md:max-w-xl mx-auto gap-5 mt-10 p-8'>
                            <h2 className='text-lg mt-3 self-center'>Become part of our family</h2>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <span>Name</span>
                                <Input type='text' value={name} />
                            </div>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <span>Username</span>
                                <Input type='text' value={username} />
                            </div>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <p>Password</p>
                                <Input type='password' value={password} />
                            </div>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <p>Confirm Password</p>
                                <Input type='password' value={confirmPassword} />
                            </div>
                            <Button type='submit' variant='signin' >
                                Register
                            </Button>
                            <div className='flex items-center justify-center gap-5 text-[14px] w-full text-gray-600'>
                                <h2>Already have account?</h2>
                                <span className='underline cursor-pointer'
                                    onClick={toggleVariant}
                                >
                                    Login
                                </span>
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Login