import { TaskInterface } from '@/app/interfaces'
import React, { useEffect, useState } from 'react'
import TaskCard from './TaskCard';
import { useAppSelector } from '@/app/store/hooks';

const TodoTask = () => {

    const tasks = useAppSelector((state) => state.task.todoTask);

    console.log(tasks);

    return (
        <div >
            {
                tasks.length > 0 && (
                    <div className='max-w-[1600px] mx-auto flex flex-col items-start w-full 
                    bg-white border border-gray-400 p-4 rounded-xl gap-10 mt-10'>
                        <h2 className='text-2xl xl:text-4xl font-bold tracking-wider'>
                            Tasks to do
                        </h2>
                        <div className='flex flex-col items-start justify-center gap-5 w-full'>
                            {
                                tasks.map((task) => (
                                    <TaskCard task={task} key={task.task_added} />
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default TodoTask