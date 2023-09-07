import React, { useEffect, useState } from 'react'
import { Rock_Salt } from 'next/font/google'
import { cn } from '@/lib/utils'
import { formatDate } from '@/app/utils/formatDate';
import { Check } from 'lucide-react';

interface TaskToComplete {
    username: string;
    task_added: string;
    due_date: string;
}


const logo = Rock_Salt({
    weight: '400',
    subsets: ["latin"]
})

const ComingUpNext = () => {

    const [task, setTask] = useState<TaskToComplete | null>(null);
    const [completed, setCompleted] = useState<boolean>(false);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await fetch(`/api/addTask`, {
                    method: 'GET'
                });
                const data = await res.json();
                setTask(data[0]);
            } catch (error) {
                console.error("Error while calling GET API call!", error)
            }
        }
        fetchTask();
    }, [])

    useEffect(() => {
    }, [task])

    if (task === null) {
        return <div className='flex w-full h-screen items-center justify-center'>
            <h1 className={cn(`text-5xl`, logo.className)}>TaskDone</h1>
        </div>
    }

    const handleComplete = async () => {
        setCompleted(!completed);
    }

    return (
        <div>
            {
                task !== null && (
                    <div className='max-w-[1600px] mx-auto flex flex-col items-start w-full 
                    bg-white border border-gray-400 p-4 rounded-xl gap-10'>
                        <h2 className='text-2xl xl:text-4xl font-bold tracking-wider'>
                            Coming Up Next
                        </h2>
                        <div className='flex flex-1 items-start justify-between border md:max-w-lg xl:max-w-xl w-full'>
                            <div className='flex flex-col items-start gap-4'>
                                <h3 className='text-2xl xl:text-3xl font-semibold tracking-wide'>{task.task_added}</h3>
                                <h4 className='xl:text-xl font-semibold tracking-wide'>{formatDate(task.due_date)}</h4>
                            </div>
                            <div className='mt-1'>
                                {
                                    completed ? (
                                        <button className='w-8 h-8 rounded-full bg-white border
                                    flex items-center justify-center'
                                            onClick={handleComplete}>
                                            <Check size={20} className='text-orange-500' />
                                        </button>
                                    ) : (
                                        <button className='w-8 h-8 rounded-full bg-white border'
                                            onClick={handleComplete}
                                        />
                                    )
                                }
                            </div>

                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ComingUpNext