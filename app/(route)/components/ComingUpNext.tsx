import React, { useEffect, useState } from 'react'
import { formatDate } from '@/app/utils/formatDate';
import { Check } from 'lucide-react';
import { getLatestTask, taskCompleted } from '@/app/store/task';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { addTaskCompleted } from '@/app/store/taskCompleted';


const ComingUpNext = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [completed, setCompleted] = useState<boolean>(false);
    const [refreshData, setRefreshData] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const todoTask = useAppSelector((state) => state.task.todoTask);

    console.log(todoTask);

    useEffect(() => {

        dispatch(getLatestTask());
    }, [dispatch]);

    useEffect(() => {
        console.log('todoTask changed: ', todoTask);
        if (todoTask.length > 0 && refreshData) {
            setCompleted(false);
            dispatch(getLatestTask());
            setRefreshData(false); // Reset completed status when todoTask changes
        }
    }, [todoTask, refreshData, dispatch]);

    const handleComplete = async () => {
        try {
            setLoading(true);
            const completedTask = { task_completed: todoTask[0].task_added };
            await dispatch(taskCompleted(completedTask));
            const completedTaskData = { task_completed: todoTask[0].task_added, due_date: todoTask[0].due_date }
            await dispatch(addTaskCompleted(completedTaskData));
            setCompleted(true);
            setLoading(false);

            setRefreshData(true);
        } catch (error) {
            console.error('Error while passing to-do item to delete API call: ', error);
        }
    };

    return (
        <div>
            {
                todoTask.length > 0 && (
                    <div className='max-w-[1600px] mx-auto flex flex-col items-start w-full 
                    bg-white border border-gray-400 p-4 rounded-xl gap-10 mt-10'>
                        <h2 className='text-2xl xl:text-4xl font-bold tracking-wider'>
                            Coming Up Next
                        </h2>
                        <div className='flex flex-1 items-start justify-between md:max-w-lg xl:max-w-xl w-full'>
                            <div className='flex flex-col items-start gap-4'>
                                <h3 className='text-2xl xl:text-3xl font-semibold tracking-wide'>{todoTask[0].task_added}</h3>
                                <h4 className='xl:text-xl font-semibold tracking-wide'>{formatDate(todoTask[0].due_date)}</h4>
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
                                                handleComplete()
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