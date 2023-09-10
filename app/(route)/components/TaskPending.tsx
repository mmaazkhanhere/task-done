import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import React, { useEffect, useState } from 'react'
import { deletePendingTask, getPendingTask } from '@/app/store/pendingTask';
import { taskCompleted } from '@/app/store/task';
import { formatDate } from '@/app/utils/formatDate';
import { Check } from 'lucide-react';
import { addTaskCompleted } from '@/app/store/taskCompleted';

const TaskPending = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [completed, setCompleted] = useState<boolean>(false);

    const pendingTasks = useAppSelector((state) => state.pendingTask.pending);
    const dispatch = useAppDispatch();

    const handleCompleted = async (task_pending: string, due_date: Date) => {
        setLoading(true);
        const completedTask = { task_completed: task_pending };
        await dispatch(taskCompleted(completedTask));

        await dispatch(addTaskCompleted({ task_completed: task_pending, due_date: due_date }))

        await dispatch(deletePendingTask({ pending_task: task_pending }))
        setCompleted(false);
        setLoading(false);
    }

    const fetchPendingTasks = async () => {
        try {
            const getPending = await dispatch(getPendingTask());
            return getPending;
        } catch (error) {
            console.error('Error while fetching pending tasks:', error);
        }
    }

    useEffect(() => {
        fetchPendingTasks();
    }, []);

    useEffect(() => {

        if (completed === true) {
            fetchPendingTasks();
        }

    }, [completed, fetchPendingTasks]);


    return (
        <div >
            {
                pendingTasks.length > 0 && (
                    <div className='max-w-[1600px] mx-auto flex flex-col items-start w-full 
                    bg-white border border-gray-400 p-4 rounded-xl gap-10 my-10'>
                        <h2 className='text-2xl xl:text-4xl font-bold tracking-wider'>
                            Tasks Pending
                        </h2>
                        {
                            pendingTasks.map((pending) => (
                                <div
                                    key={pending.task_pending}
                                    className='flex flex-1 items-start justify-between md:max-w-lg xl:max-w-xl w-full'>
                                    <div className='flex flex-col items-start gap-4'>
                                        <h3 className='text-2xl xl:text-3xl text-red-500 font-semibold tracking-wide'>{pending.task_pending}</h3>
                                        <h4 className='xl:text-xl text-red-500 font-semibold tracking-wide'>{formatDate(pending.due_date)}</h4>
                                    </div>
                                    {
                                        completed ? (
                                            <button className='w-8 h-8 rounded-full bg-white border
                                            flex items-center justify-center'
                                            >
                                                <Check size={20} className='text-orange-500' />
                                            </button>
                                        ) : (
                                            <button className='w-8 h-8 rounded-full bg-white border border-red-500'
                                                disabled={loading}
                                                onClick={() => {
                                                    handleCompleted(pending.task_pending, pending.due_date)
                                                }}
                                            />
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>

                )
            }

        </div>
    )
}

export default TaskPending