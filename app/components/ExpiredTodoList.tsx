"use client";

import { ITask } from '@/types/tasks'
import React from 'react'
import Task from './Task';
import ExpiredTask from './ExpiredTask';

interface TodoListProps {
    tasks: ITask[]
    setTasks: React.Dispatch<React.SetStateAction<ITask>>
}

const ExpiredTodoList: React.FC<TodoListProps> = ({tasks, setTasks}) => {
    const reversedTasks = [...tasks].reverse();

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th className='font-bold text-black text-lg uppercase'>Title</th>
                    <th className='font-bold text-black text-lg uppercase'>Expired Date</th>
                    <th className='font-bold text-black text-lg uppercase pl-30'>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {reversedTasks.map(task => (
                        <ExpiredTask key={task.id} task={task} setTasks={setTasks} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ExpiredTodoList