import React, { useEffect, useState } from 'react'
import { Rock_Salt } from 'next/font/google'
import { formatDate } from '@/app/utils/formatDate';
import { Check } from 'lucide-react';
import axios from 'axios';
import { TaskInterface } from '@/app/interfaces';


const logo = Rock_Salt({
    weight: '400',
    subsets: ["latin"]
})

const ComingUpNext = () => {

    const [task, setTask] = useState<TaskInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [completed, setCompleted] = useState<boolean>(false);

    const fetchTask = async () => {
        try {
            const res = await fetch(`/api/addTask`, {
                method: 'GET'
            });
            const data = await res.json();
            setTask(data);
            setCompleted(false);
        } catch (error) {
            console.error("Error while calling GET API call!", error)
        }
    }

    useEffect(() => {
        fetchTask();
    }, []);

    useEffect(() => {
        if (completed === true) {
            fetchTask();
        }
        else {
            return;
        }
    }, [completed])

    const handleComplete = async () => {
        try {
            setLoading(true);
            const encodedTask = encodeURIComponent(task[0].task_added);
            const encodedTime = encodeURIComponent(task[0].due_date)
            const url = `/api/addTask?delete_item=${encodedTask}&due_time=${encodedTime}`;

            const req = await axios.delete(url);

            if (req.status === 200) {
                const result = await req.data;
            }
            setCompleted(true);
            setLoading(false);
        } catch (error) {
            console.error("Error while passing to do item to delete api call: ", error);
        }
    }

    const handleAddToComplete = async () => {
        try {
            setLoading(true);
            const req = await axios.post(`/api/completedTask`, {
                task_completed: task[0].task_added
            });
            if (req.status === 200) {
                const result = await req.data;
            }
            setLoading(false);
        } catch (error) {
            console.error("Error while passing to do item to delete api call: ", error);
        }
    }



    return (
        <div>
            {
                task.length > 0 && (
                    <div className='max-w-[1600px] mx-auto flex flex-col items-start w-full 
                    bg-white border border-gray-400 p-4 rounded-xl gap-10 mt-10'>
                        <h2 className='text-2xl xl:text-4xl font-bold tracking-wider'>
                            Coming Up Next
                        </h2>
                        <div className='flex flex-1 items-start justify-between md:max-w-lg xl:max-w-xl w-full'>
                            <div className='flex flex-col items-start gap-4'>
                                <h3 className='text-2xl xl:text-3xl font-semibold tracking-wide'>{task[0].task_added}</h3>
                                <h4 className='xl:text-xl font-semibold tracking-wide'>{formatDate(task[0].due_date)}</h4>
                            </div>
                            <div className='mt-1'>
                                {
                                    completed ? (
                                        <button className='w-8 h-8 rounded-full bg-white border
                                    flex items-center justify-center'
                                        >
                                            <Check size={20} className='text-orange-500' />
                                        </button>
                                    ) : (
                                        <button className='w-8 h-8 rounded-full bg-white border'
                                            disabled={loading}
                                            onClick={() => {
                                                handleComplete(),
                                                    handleAddToComplete()
                                            }}
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