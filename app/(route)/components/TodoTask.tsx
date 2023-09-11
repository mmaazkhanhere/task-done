
import React, { useEffect, useState } from 'react'
import TaskCard from './TaskCard';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getAllTasks } from '@/app/store/todoTask';

const TodoTask = () => {

    const todoTask = useAppSelector(state => state.todoTasks.task); const dispatch = useAppDispatch();
    const [completed, setCompleted] = useState(false);

    const handleCompletion = () => {
        setCompleted(true);
    };

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    useEffect(() => {
        if (completed === true) {
            dispatch(getAllTasks());
            setCompleted(false);
        }
    }, [completed, dispatch]);

    console.log(todoTask);

    return (
        <div >
            {
                todoTask.length > 0 && (
                    <div className='bg-gradient-to-bl from-[#ff7f50] via-[#f39e0c] to-[#ffc000] w-full h-full
                    p-4 rounded-xl  mt-10'>
                        <div className='max-w-[1600px] mx-auto flex flex-col items-start
                        gap-10 w-full'>
                            <h2 className='text-2xl xl:text-4xl font-bold tracking-wider'>
                                Tasks to do
                            </h2>
                        </div>
                        <div className='flex flex-col items-start justify-center gap-5'>
                            {
                                todoTask.map((task) => (
                                    <TaskCard key={task.task_added} task={task} onComplete={() => handleCompletion()} />
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