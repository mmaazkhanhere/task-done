import React, { useEffect, useState } from 'react'
import { formatDate } from '@/app/utils/formatDate';
import DateTimePicker from 'react-datetime-picker';

import { editTask, getLatestTask, taskCompleted } from '@/app/store/task';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { addTaskCompleted } from '@/app/store/taskCompleted';

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


type ValuePiece = Date | null;


const ComingUpNext = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [completed, setCompleted] = useState<boolean>(false);
    const [refreshData, setRefreshData] = useState<boolean>(false);

    const [newTask, setNewTask] = useState<string>("");
    const [date, onChange] = useState<ValuePiece>(new Date());
    const [errorMessage, setErrorMessage] = useState("");

    const { toast } = useToast();


    const dispatch = useAppDispatch();
    const todoTask = useAppSelector((state) => state.task.todoTask);

    useEffect(() => {

        dispatch(getLatestTask());
    }, [dispatch]);

    useEffect(() => {
        if (todoTask.length > 0 && refreshData) {
            setCompleted(false);
            dispatch(getLatestTask());
            setRefreshData(false); // Reset completed status when todoTask changes
        }
    }, [todoTask, refreshData, dispatch]);

    const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.target.value);
    }

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

    const handleEditTask = async () => {
        try {
            setLoading(true);

            if (newTask === "" || newTask === null) {
                setErrorMessage("Please fill in the details")
            }
            else {
                setErrorMessage("");
                if (date !== null) {
                    dispatch(editTask({ task_name: newTask, new_date: date }));

                    toast({
                        description: "Task Changed.",
                        variant: "custom"
                    })
                }
            };

            setLoading(false);
        } catch (error) {
            console.error("Error while passing value to editTask async thunk: ", error);
        }

    }

    return (
        <div>
            {
                todoTask.length > 0 && (
                    <Dialog>
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
                                <div className='flex items-center justify-start mt-1 gap-10'>
                                    <DialogTrigger>
                                        <button>
                                            <PencilIcon />
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
                                                    // onChange={}
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
                                                onClick={() => {
                                                    handleEditTask()
                                                }}
                                            >
                                                Edit Task
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
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
                    </Dialog>
                )
            }
        </div>
    )
}

export default ComingUpNext