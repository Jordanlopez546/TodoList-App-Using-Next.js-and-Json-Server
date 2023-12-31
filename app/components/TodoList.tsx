"use client";

import { ITask } from '@/types/tasks'
import React from 'react'
import Task from './Task';

interface TodoListProps {
    tasks: ITask[]
    setTasks: React.Dispatch<React.SetStateAction<ITask>>
}

const TodoList: React.FC<TodoListProps> = ({tasks, setTasks}) => {
    const reversedTasks = [...tasks].reverse();

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th className='font-bold text-black text-lg uppercase'>Title</th>
                    <th className='font-bold text-black text-lg uppercase'>Expiry Date</th>
                    <th className='font-bold text-black text-lg uppercase pl-30'>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {reversedTasks.map(task => (
                        <Task key={task.id} task={task} setTasks={setTasks} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TodoList