import React, { useEffect, useState } from 'react'
import DateTimePicker from 'react-datetime-picker';

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast, useToast } from '@/components/ui/use-toast'

import { BsFillCalendarDateFill } from "react-icons/bs"
import { Check, PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { deleteTask, getLatestTask, updateTask } from '@/app/store/todoTask';
import { formatDate } from '@/app/utils/formatDate';
import { addPending } from '@/app/store/pendingTask';



type ValuePiece = Date | null;


const ComingUpNext = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [completed, setCompleted] = useState<boolean>(false);

    const [newTask, setNewTask] = useState<string>("");
    const [date, onChange] = useState<ValuePiece>(new Date());
    const [errorMessage, setErrorMessage] = useState("");

    const { toast } = useToast();

    const latestTask = useAppSelector(state => state.todoTasks.task);
    const dispatch = useAppDispatch();

    console.log(latestTask);

    const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.target.value);
    }

    useEffect(() => {
        dispatch(getLatestTask());
    }, [dispatch]);

    useEffect(() => {
        if (completed === true) {
            dispatch(getLatestTask());
            setCompleted(false);
        }
    }, [dispatch, completed]);

    useEffect(() => {
        const currentDate = new Date();

        if (latestTask.length > 0) {
            const dueDate = new Date(latestTask[0].due_date);
            if (currentDate > dueDate) {
                dispatch(addPending({ pending_task: latestTask[0].task_added, pending_date: latestTask[0].due_date }));
                setCompleted(false);
            }
        }
    }, [dispatch, latestTask])

    const handleCompleted = () => {
        setLoading(true);
        dispatch(deleteTask({ task_added: latestTask[0].task_added }));
        toast({
            description: 'Congrulation! Task Completed',
            variant: 'custom'
        });
        setLoading(false);
        setCompleted(true);
    }

    const handleEdit = () => {
        setLoading(true);
        if (!date) {
            setErrorMessage("Select a valid date");
        }
        else {
            dispatch(updateTask({ new_task: newTask, new_date: date }));
            setCompleted(true);
        }
        setLoading(false);
    }

    return (
        <div>
            {
                latestTask.length > 0 && (
                    <Dialog>
                        <div className='max-w-[1600px] mx-auto flex flex-col items-start w-full 
                        border border-gray-400 p-4 rounded-xl gap-10 mt-10
                        bg-gradient-to-bl from-[#ff7f50] via-[#f39e0c] to-[#ffc000]'
                        >
                            <h2 className='text-2xl xl:text-4xl font-bold tracking-wider'>
                                Coming Up Next
                            </h2>
                            <div className='flex flex-1 items-start justify-between md:max-w-lg xl:max-w-xl w-full'>
                                <div className='flex flex-col items-start gap-4'>
                                    <h3 className='text-2xl xl:text-3xl font-semibold tracking-wide'>
                                        {latestTask[0].task_added}
                                    </h3>
                                    <h4 className='xl:text-xl font-semibold tracking-wide'>
                                        {formatDate(latestTask[0].due_date)}
                                    </h4>
                                </div>
                                <div className='flex items-center justify-start mt-1 gap-10'>
                                    <DialogTrigger>
                                        <button>
                                            <PencilIcon fill='white' />
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Edit Task
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className='flex flex-col items-start justify-center gap-4'>
                                            <div className='w-full'>
                                                {
                                                    errorMessage !== "" && (
                                                        <p className='text-red-500'>{errorMessage}</p>
                                                    )
                                                }
                                                <Label htmlFor="name" className="text-right">
                                                    Change name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    placeholder='Complete homework..'
                                                    value={newTask}
                                                    onChange={handleTaskChange}
                                                    className="w-full mt-2"
                                                />
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <Label htmlFor='datetime'>Select new date and time</Label>
                                                <DateTimePicker
                                                    name='datetime'
                                                    required={true}
                                                    minDate={new Date()}
                                                    onChange={onChange}
                                                    value={date}
                                                    minDetail='month'
                                                    className={`mt-2`}
                                                    calendarIcon={<BsFillCalendarDateFill />}

                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                type='submit'
                                                variant='signin'
                                                disabled={loading}
                                                onClick={handleEdit}
                                            >
                                                Edit Task
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                    <button className='w-8 h-8 rounded-full bg-white border relative'
                                        disabled={loading}
                                        onClick={handleCompleted}
                                    />
                                    {
                                        completed && (
                                            <div className='w-7 h-7 rounded-full bg-orange-500 absolute flex 
                                            items-center justify-center'/>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </Dialog>
                )
            }
        </div>
    )
}

export default ComingUpNext