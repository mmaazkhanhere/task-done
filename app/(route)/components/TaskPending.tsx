import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import React, { useEffect, useState } from 'react'
import { Check } from 'lucide-react';
import { formatDate } from '@/app/utils/formatDate';
import { deletePending, getPendingTask } from '@/app/store/pendingTask';
import { addCompletedTask } from '@/app/store/completedTask';


const TaskPending = () => {

    const pendingTask = useAppSelector(state => state.pendingTask.pending);
    const dispatch = useAppDispatch();

    console.log(pendingTask);

    const [loading, setLoading] = useState<boolean>(false);
    const [completed, setCompleted] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getPendingTask());
    }, [dispatch]);

    useEffect(() => {
        if (completed === true) {
            dispatch(getPendingTask());
            setCompleted(false);
        }
    }, [completed, dispatch])

    const handleCompleted = (pending_task: string, due_date: Date) => {
        setLoading(true);
        dispatch(deletePending({ pending_task: pending_task }));
        dispatch(addCompletedTask({ task_completed: pending_task, due_date: due_date }));
        setCompleted(true);
        setLoading(false);
    }

    return (

        <div >
            {
                pendingTask.length > 0 && (
                    <div className='max-w-[1600px] mx-auto flex flex-col items-start w-full 
                    bg-white border border-red-500 p-4 rounded-xl gap-10 my-10'>
                        <h2 className='text-2xl xl:text-4xl font-bold tracking-wider'>
                            Tasks Pending
                        </h2>
                        {
                            pendingTask.map((pending) => (
                                <div
                                    key={pending.task_pending}
                                    className='flex flex-1 items-start justify-between md:max-w-lg xl:max-w-xl w-full'>
                                    <div className='flex flex-col items-start gap-4'>
                                        <h3 className='text-2xl xl:text-3xl text-red-500 font-semibold tracking-wide'>
                                            {pending.task_pending}
                                        </h3>
                                        <h4 className='xl:text-xl text-red-500 font-semibold tracking-wide'>
                                            {
                                                formatDate(pending.due_date)
                                            }
                                        </h4>
                                    </div>
                                    <button className='w-8 h-8 rounded-full bg-white border border-red-500 
                        relative'
                                        disabled={loading}
                                        onClick={() => handleCompleted(pending.task_pending, pending.due_date)}
                                    />
                                    {
                                        completed && (
                                            <div className='w-7 h-7 rounded-full bg-orange-500 absolute flex 
                                items-center justify-center left-0 top-0'/>
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