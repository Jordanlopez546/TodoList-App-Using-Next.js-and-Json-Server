"use client";

import { addTodoTask } from '@/api';
import React, {FormEventHandler, useState} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import {FcExpired} from 'react-icons/fc'
import { v4 as uuidv4 } from 'uuid';
import AddUpdateModal from './AddUpdateModal';
import Link from 'next/link';
import { ITask } from '@/types/tasks';
import Swal from 'sweetalert2';


interface AddTaskProps {
    tasks: ITask[];
    setTasks: React.Dispatch<React.SetStateAction<ITask[]>>
}

const AddTask: React.FC<AddTaskProps> = ({setTasks, tasks}) => {
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDelete] = useState<boolean>(false);
    const [newTask, setNewTask] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<string>('');

        const handleSubmitAddTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (newTask.trim() !== "") {
            const newValue = await addTodoTask({
                id: uuidv4(),
                task: newTask,
                date: selectedDate
            })

            // Clear the selectedDate after successfully adding the task
            setSelectedDate('');
            
            setTasks([ ...tasks, newValue])
            setNewTask("");
            setOpenModalUpdate(false)
            Swal.fire('Success!', 'The task was added successfully', 'success');
        }
        else{
            alert("Textarea is empty. Add a task!");
        }
    }

    return (
        <div>
            <div className='flex flex-row justify-between items-center'>
                <button
                    onClick={() => setOpenModalUpdate(true)}
                    className='btn btn-primary w-75 transition-colors duration-300 ease-in-out bg-dodgerblue hover:bg-green'
                >
                    Add a New Task
                
                <AiOutlinePlus className="ml-2 bg-transparent" style={{ background: 'transparent' }} size={18} />
                </button>
                <Link href='/expired'>
                    <button
                        className='btn btn-primary w-75 transition-colors duration-300 ease-in-out bg-dodgerblue hover:bg-green'
                    >
                        Expired Tasks
                    
                    <FcExpired className="ml-2 bg-transparent" style={{ background: 'transparent' }} size={18} />
                    </button>
                </Link>
            </div>
            <AddUpdateModal selectedDate={selectedDate} setSelectedDate={setSelectedDate} action="Add" openModalUpdate={openModalUpdate} setOpenModalUpdate={setOpenModalUpdate} taskToEdit={newTask} setTaskToEdit={setNewTask} handleSubmitUpdateTodo={handleSubmitAddTodo} />
        </div>
    )
}

export default AddTask