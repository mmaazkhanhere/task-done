import { TaskInterface } from '@/app/interfaces'
import { formatDate } from '@/app/utils/formatDate'
import axios from 'axios';
import { Check } from 'lucide-react';
import React, { useState } from 'react'

const TaskCard: React.FC<{ task: TaskInterface }> = ({ task }) => {

    const [completed, setCompleted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleComplete = async () => {
        try {
            setLoading(true);
            const encodedTask = encodeURIComponent(task.task_added);
            const encodedTime = encodeURIComponent(task.due_date.toISOString())
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
                task_completed: task.task_added
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
        <div className='flex flex-1 items-start justify-between md:max-w-lg xl:max-w-xl w-full'>
            <div className='flex flex-col items-start gap-4'>
                <h3 className='text-2xl xl:text-3xl font-semibold tracking-wide'>{task.task_added}</h3>
                <h4 className='xl:text-xl font-semibold tracking-wide'>{formatDate(task.due_date.toISOString())}</h4>
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
    )
}

export default TaskCard