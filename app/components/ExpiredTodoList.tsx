"use client";

import { ITask } from '@/types/tasks'
import React from 'react'
import Task from './Task';
import ExpiredTask from './ExpiredTask';

interface TodoListProps {
    tasks: ITask[]
}

const ExpiredTodoList: React.FC<TodoListProps> = ({tasks}) => {
    const reversedTasks = [...tasks].reverse();

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th className='font-bold text-black text-lg uppercase'>Title</th>
                    <th className='font-bold text-black text-lg uppercase'>Expired Date</th>
                </tr>
                </thead>
                <tbody>
                    {reversedTasks.map(task => (
                        <ExpiredTask key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ExpiredTodoList