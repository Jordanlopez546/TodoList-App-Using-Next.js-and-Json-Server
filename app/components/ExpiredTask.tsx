"use client";

import { ITask } from '@/types/tasks';
import React, {useState, FormEventHandler} from 'react'
import { addDays, format, parseISO } from 'date-fns';


interface TaskProps {
    task: ITask
}

const ExpiredTask: React.FC<TaskProps> = ({task}) => {


    let formattedDate = "Invalid Date";
    let parsedDate; // Declare parsedDate outside of try-catch block.

    try {
        parsedDate = parseISO(task.date);
        formattedDate = format(parsedDate, 'dd/MM/yyyy');
    } catch (error) {
        console.error("Error parsing or formatting date:", error);
    }

    const today = new Date();
    const minSelectableDate = addDays(today, -1);

    return (
        <tr key={task.id}>
            {parsedDate < minSelectableDate ? (
                <>
                    <td className='text-black font-normal text-base w-full'>{task.task}</td>
                    <td className='text-black font-normal text-base'>{formattedDate}</td>
                </>
            ) : ""}
        </tr>
    )
}

export default ExpiredTask