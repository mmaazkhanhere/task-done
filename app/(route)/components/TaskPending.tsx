import { useAppSelector } from '@/app/store/hooks'
import React from 'react'
import PendingTask from './PendingTask';

const TaskPending = () => {

    const pendingTasks = useAppSelector((state) => state.pendingTask.pending);
    console.log(pendingTasks);

    return (
        <div >
            {
                pendingTasks.length > 0 && (
                    <div className='max-w-[1600px] mx-auto flex flex-col items-start w-full 
                    bg-white border border-gray-400 p-4 rounded-xl gap-10 mt-10'>
                        <h2 className='text-2xl xl:text-4xl font-bold tracking-wider'>
                            Tasks Pending
                        </h2>
                        {
                            pendingTasks.map((pending) => (
                                <PendingTask pending={pending} key={pending.task_pending} />
                            ))
                        }
                    </div>

                )
            }

        </div>
    )
}

export default TaskPending