import React, { useEffect, useState } from 'react'
import { TaskInterface } from '@/app/interfaces'
import { useAppDispatch } from '@/app/store/hooks';
import { formatDate } from '@/app/utils/formatDate';

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

import DateTimePicker from 'react-datetime-picker';
import { editTask, taskCompleted } from '@/app/store/task';
import { addTaskCompleted } from '@/app/store/taskCompleted';
import { addPendingTask } from '@/app/store/pendingTask';

type ValuePiece = Date | null;

const TaskCard: React.FC<{ task: TaskInterface }> = ({ task }) => {

    const [completed, setCompleted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [newTask, setNewTask] = useState<string>("");
    const [date, onChange] = useState<ValuePiece>(new Date());
    const [errorMessage, setErrorMessage] = useState("");


    const dispatch = useAppDispatch();

    useEffect(() => {
        const pendingTasks = async () => {
            if (!task.task_added || !task.due_date) {
                const currentDate = new Date();
                if (task.due_date <= currentDate) {
                    await dispatch(addPendingTask({
                        pending_task: task.task_added,
                        due_date: task.due_date
                    }));
                };
            };
        };
        pendingTasks();
    }, [dispatch, task.due_date, task.task_added])

    const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.target.value);
    }

    const handleComplete = async () => {
        try {
            setLoading(true);
            const completedTask = { task_completed: task.task_added };
            await dispatch(taskCompleted(completedTask));
            const completedTaskData = { task_completed: task.task_added, due_date: task.due_date }
            await dispatch(addTaskCompleted(completedTaskData));
            setCompleted(true);
            setLoading(false);

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
        <div className='flex flex-1 items-start justify-between md:max-w-lg xl:max-w-xl w-full
        bg-gradient-to-bl from-[#ff7f50] via-[#f39e0c] to-[#ffc000] '>
            <Dialog>
                <div className='flex flex-col items-start gap-4'>
                    <h3 className='text-2xl xl:text-3xl font-semibold tracking-wide'>{task.task_added}</h3>
                    <h4 className='xl:text-xl font-semibold tracking-wide'>{formatDate(task.due_date)}</h4>
                </div>
                <div className='flex items-center justify-start gap-10 mt-1 '>
                    <DialogTrigger>
                        <button>
                            <PencilIcon />
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Change Task Details
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
            </Dialog>
        </div>
    )
}

export default TaskCard