
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { deleteCompleted } from '@/app/store/taskCompleted';
import { formatDate } from '@/app/utils/formatDate';
import { Trash } from 'lucide-react'
import React, { useState } from 'react'

const CompletedTask = () => {

    const [loading, setLoading] = useState(false);
    const completedTasks = useAppSelector((state) => state.taskCompleted.tasks);

    const dispatch = useAppDispatch();

    const handleDelete = async (task: string) => {
        try {
            setLoading(true);
            await dispatch(deleteCompleted({ task_completed: task }))
            setLoading(false);
        } catch (error) {

        }
    }

    console.log(completedTasks);

    return (
        <div>
            {
                completedTasks.length > 0 && (
                    <div className='max-w-[1600px] mx-auto flex flex-col items-start w-full 
                    bg-white border border-gray-400 p-4 rounded-xl gap-10 mt-10'>
                        <h2 className='text-2xl xl:text-4xl font-bold tracking-wider'>
                            Task Completed
                        </h2>
                        <div className='flex flex-col items-start justify-center gap-5 w-full max-w-md md:max-w-xl xl:max-w-3xl'>
                            {
                                completedTasks.map((task) => (
                                    <div
                                        key={task.task_completed}
                                        className='flex flex-1 items-start justify-between w-full'
                                    >
                                        <div className='flex flex-col md:flex-row items-start md:items-center justify-center gap-5'>
                                            <h3 className='text-2xl xl:text-3xl line-through text-gray-500 font-semibold tracking-wide'>
                                                {task.task_completed}
                                            </h3>
                                            <span className='text-lg: xl:text-xl line-through'>{formatDate(task.due_date)}</span>
                                        </div>
                                        <Trash
                                            className='mt-1'
                                            onClick={() => handleDelete(task.task_completed)}
                                            aria-disabled={loading}
                                        />
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default CompletedTask