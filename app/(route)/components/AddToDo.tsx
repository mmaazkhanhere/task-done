"use client"

import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { BsFillCalendarDateFill } from "react-icons/bs"

import { Button } from "@/components/ui/button"
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

import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import axios from 'axios'
import { useRouter } from 'next/navigation'

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const AddToDo = () => {

    const [taskName, setTaskName] = useState<string>("");
    const [value, onChange] = useState<Value>(new Date());
    const [loading, setLoading] = useState<boolean>(false);

    const [errorMessage, setErrorMessage] = useState("");

    const { toast } = useToast();


    const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(event.target.value);
    }

    const handleAddTask = async () => {

    }

    return (
        <div className='flex flex-grow max-w-[1600px] mx-auto mt-10'>
            <Dialog>
                <DialogTrigger>
                    <div className='flex items-center justify-between w-60 px-4'>
                        <p className='xl:text-xl'>Add new task</p>
                        <Plus
                            className='bg-orange-400 rounded-full w-9 h-9 p-2 text-white'
                        />
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Add new task
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
                                Title
                            </Label>
                            <Input
                                id="name"
                                placeholder='Buy gorcerries'
                                value={taskName}
                                onChange={handleTaskChange}
                                className="w-full mt-2"
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='datetime'>Select date and time</Label>
                            <DateTimePicker
                                name='datetime'
                                required={true}
                                minDate={new Date()}
                                onChange={onChange}
                                value={value}
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
                            onClick={() => {
                                handleAddTask(),
                                    toast({
                                        description: "Task added.",
                                        variant: "custom"
                                    })
                            }}
                        >
                            Add Task
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>

    )
}

export default AddToDo