
import { deleteCompleted, getCompletedTask } from '@/app/store/completedTask';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { formatDate } from '@/app/utils/formatDate';
import { useToast } from '@/components/ui/use-toast';
import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const CompletedTask = () => {

    const [loading, setLoading] = useState(false);
    const completedTasks = useAppSelector(state => state.completedTask.completed);

    const dispatch = useAppDispatch();

    const { toast } = useToast();

    useEffect(() => {
        dispatch(getCompletedTask());
    }, [dispatch]);

    useEffect(() => {
        if (loading === true) {
            dispatch(getCompletedTask());
            setLoading(false);
        }
    }, [dispatch, loading])

    const handleDelete = (task_completed: string) => {
        setLoading(true);
        dispatch(deleteCompleted({ task_added: task_completed }));
        toast({
            description: 'Task deleted',
            variant: 'destructive'
        });
    }

    return (
        <div>
            {
                completedTasks.length > 0 && (
                    <div className='max-w-[1600px] mx-auto flex flex-col items-start w-full 
                    p-4 rounded-xl gap-10 mt-10
                    bg-gradient-to-bl from-[#ff7f50] via-[#f39e0c] to-[#ffc000] '
                    >
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
                                            fill='white'
                                            className='mt-1 cursor-pointer'
                                            aria-disabled={loading}
                                            onClick={() => handleDelete(task.task_completed)}
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