
import { useAppSelector } from '@/app/store/hooks';
import { Trash } from 'lucide-react'
import React from 'react'

const CompletedTask = () => {

    const completedTasks = useAppSelector((state) => state.taskCompleted.completedTask);

    return (
        <div>
            {
                completedTasks.length > 0 && (
                    <div className='max-w-[1600px] mx-auto flex flex-col items-start w-full 
                    bg-white border border-gray-400 p-4 rounded-xl gap-10 mt-10'>
                        <h2 className='text-2xl xl:text-4xl font-bold tracking-wider'>
                            Task Completed
                        </h2>
                        <div className='flex flex-col items-start justify-center gap-5'>
                            {
                                completedTasks.map((task) => (
                                    <div
                                        key={task.task_completed}
                                        className='flex flex-1 items-start justify-between md:max-w-lg xl:max-w-xl w-full'
                                    >
                                        <h3 className='text-2xl xl:text-3xl line-through text-gray-500 font-semibold tracking-wide'>
                                            {task.task_completed}
                                        </h3>
                                        <Trash />
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