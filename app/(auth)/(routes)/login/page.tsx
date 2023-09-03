"use client"

import React, { useState } from 'react'
import { Rock_Salt } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'


const logo = Rock_Salt({
    weight: '400',
    subsets: ["latin"]
})

type VariantType = 'Login' | 'Register'

const Login = () => {

    const [variant, setVariant] = useState<VariantType>('Login')
    const [loading, setLoading] = useState<boolean>(false)

    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [matchingPassword, setMatchingPassword] = useState<boolean>(true)
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const router = useRouter()

    const toggleVariant = () => {
        if (variant === 'Login') {
            setLoading(true);
            setVariant('Register');
            setLoading(false);
        } else {
            setLoading(true);
            setVariant('Login');
            setLoading(false);
        }
    }

    const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPasswordValue = event.target.value;
        setConfirmPassword(confirmPasswordValue);

        if (password !== "" && confirmPasswordValue !== "") {
            setMatchingPassword(confirmPasswordValue === password);
        } else {
            setMatchingPassword(false);
        }
    }

    const handleRegister = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/register`, {
                method: 'POST',
                body: JSON.stringify({
                    customer_name: name,
                    username: username,
                    email: email,
                    user_password: password
                })
            });
            if (res.ok) {
                router.push('/')
                const result = await res.json();
            }
            setLoading(false)
        } catch (error) {
            console.error("Error while passing user detail to api", error)
        }
    }


    return (
        <div className='flex items-center justify-center w-full h-full'>
            {
                variant === 'Login' && (
                    <div className='flex flex-col items-start justify-center'>
                        <h1 className={cn(`text-6xl lg:text-7xl`, logo.className)}>TaskDone</h1>
                        <div className='flex flex-col items-start justify-center bg-white rounded-xl 
                        w-full md:max-w-xl mx-auto gap-5 mt-20 p-8'>
                            <h2 className='text-lg self-center text-[14px]'>Sign in to your account</h2>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <Label htmlFor='username'>Username</Label>
                                <Input type='text' name='username' className='mt-3' />
                            </div>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <Label htmlFor='password'>Password</Label>
                                <Input name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    className='mt-3'
                                />
                            </div>
                            <Button type='submit' variant='signin' >
                                Login
                            </Button>
                            <div className='flex flex-col lg:flex-row gap-2 lg:gap-0 items-center justify-between 
                            text-[14px] w-full text-gray-600'>
                                <h2>New to TaskDone?</h2>
                                <span className='underline cursor-pointer'
                                    aria-disabled={loading}
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
                        <div className='flex flex-col items-start justify-center bg-white rounded-xl 
                        w-full md:max-w-xl mx-auto gap-5 mt-14 p-8'>
                            <h2 className='text-lg self-center text-[14px]'>Become part of our family</h2>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <Label htmlFor='name'>Name</Label>
                                <Input type='text' name='name' value={name}
                                    placeholder='John Doe'
                                    onChange={handleName}
                                    className='mt-3'
                                />
                            </div>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <Label htmlFor='username'>Username</Label>
                                <Input type='text' name='username'
                                    value={username}
                                    onChange={handleUsername}
                                    placeholder='johndoe'
                                    className='mt-3'
                                />
                            </div>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <Label htmlFor='email'>Email</Label>
                                <Input type='email' value={email}
                                    name='email'
                                    placeholder='example@mail.com'
                                    onChange={handleEmail}
                                    className='mt-3'
                                />

                            </div>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <Label htmlFor='password'>Password</Label>
                                <Input type='password'
                                    name='password'
                                    value={password}
                                    onChange={handlePassword}
                                    className='mt-3'
                                />
                            </div>
                            <div className='flex flex-col items-start justify-center w-full'>
                                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                                <Input type='password'
                                    name='confrimPassword'
                                    value={confirmPassword}
                                    onChange={handleConfirmPassword}
                                    className='mt-3'
                                />
                            </div>
                            {
                                matchingPassword === false && (
                                    <p className="text-red-500">Passwords do not match</p>
                                )
                            }
                            <Button type='submit' variant='signin' disabled={loading} onClick={handleRegister}>
                                Register
                            </Button>
                            <div className='flex items-center justify-center gap-5 text-[14px] w-full text-gray-600'>
                                <h2>Already have account?</h2>
                                <span className='underline cursor-pointer'
                                    aria-disabled={loading}
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