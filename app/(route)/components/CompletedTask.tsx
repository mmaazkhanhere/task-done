
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { useToast } from '@/components/ui/use-toast';
import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const CompletedTask = () => {

    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const { toast } = useToast();

    return (
        <div>

            <div className='max-w-[1600px] mx-auto flex flex-col items-start w-full 
                    border border-gray-400 p-4 rounded-xl gap-10 mt-10
                    bg-gradient-to-bl from-[#ff7f50] via-[#f39e0c] to-[#ffc000] '
            >
                <h2 className='text-2xl xl:text-4xl font-bold tracking-wider'>
                    Task Completed
                </h2>
            </div>

        </div>
    )
}

export default CompletedTask