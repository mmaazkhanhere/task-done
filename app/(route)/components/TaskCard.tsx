import React, { useEffect, useState } from 'react'
import { TaskInterface } from '@/app/interfaces'
import { useAppDispatch } from '@/app/store/hooks';

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
import { formatDate } from '@/app/utils/formatDate';
import { deleteTask, getAllTasks, updateTask } from '@/app/store/todoTask';


type ValuePiece = Date | null;

const TaskCard: React.FC<{ task: TaskInterface; onComplete: () => void }> = ({ task, onComplete }) => {

    // const [completed, setCompleted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [newTask, setNewTask] = useState<string>("");
    const [date, onChange] = useState<ValuePiece>(new Date());
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useAppDispatch();

    const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.target.value);
    };

    const handleCompleted = () => {
        setLoading(true);
        dispatch(deleteTask({ task_added: task.task_added }));
        toast({
            description: 'Congrulation! Task Completed',
            variant: 'custom'
        });
        setLoading(false);
        onComplete();
    }

    const handleEdit = () => {
        setLoading(true);
        if (!date) {
            setErrorMessage("Select a valid date");
        }
        else {
            dispatch(updateTask({ new_task: newTask, new_date: date }));
            onComplete();
        }
        setLoading(false);
    }

    return (
        <div className='flex flex-1 items-start justify-between md:max-w-lg xl:max-w-xl w-full mt-10'>
            <Dialog>
                <div className='flex flex-col items-start gap-4'>
                    <h3 className='text-2xl xl:text-3xl font-semibold tracking-wide'>{task.task_added}</h3>
                    <h4 className='xl:text-xl font-semibold tracking-wide'>{formatDate(task.due_date)}</h4>
                </div>
                <div className='flex items-center justify-start gap-10 mt-1 '>
                    <DialogTrigger>
                        <button>
                            <PencilIcon fill='white' />
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
                                onClick={handleEdit}
                            >
                                Edit Task
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                    <button className='w-8 h-8 rounded-full bg-white border'
                        disabled={loading}
                        onClick={handleCompleted}
                    />
                </div>
            </Dialog>
        </div>
    )
}

export default TaskCard