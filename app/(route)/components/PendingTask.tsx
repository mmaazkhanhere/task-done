import { PendingTaskInterface } from '@/app/interfaces'
import { useAppDispatch } from '@/app/store/hooks';
import { taskCompleted } from '@/app/store/task';
import { formatDate } from '@/app/utils/formatDate'
import { Check } from 'lucide-react';
import React, { useState } from 'react'

const PendingTask: React.FC<{ pending: PendingTaskInterface }> = ({ pending }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [completed, setCompleted] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const handleCompleted = async () => {
        setLoading(true);
        const completedTask = { task_completed: pending.task_pending };
        await dispatch(taskCompleted(completedTask));
        setCompleted(false);
        setLoading(false);
    }

    console.log(pending.due_date);

    return (
        <div className='flex flex-1 items-start justify-between md:max-w-lg xl:max-w-xl w-full'>
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
                    <button className='w-8 h-8 rounded-full bg-white border'
                        disabled={loading}
                        onClick={() => {
                            handleCompleted()
                        }}
                    />
                )
            }
        </div>
    )
}

export default PendingTask