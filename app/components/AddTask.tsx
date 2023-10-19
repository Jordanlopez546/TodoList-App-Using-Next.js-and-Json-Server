"use client";

import { addTodoTask } from '@/api';
import React, {FormEventHandler, useState} from 'react'
import {AiOutlinePlus} from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid';
import AddUpdateModal from './AddUpdateModal';

const AddTask = () => {
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDelete] = useState<boolean>(false);
    const [newTask, setNewTask] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<string>('');

        const handleSubmitAddTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (newTask !== "") {
            await addTodoTask({
                id: uuidv4(),
                task: newTask,
                date: selectedDate
            })
            location.reload();
            setNewTask("");
            setOpenModalUpdate(false)
            alert("Task added successfully");
        }
        else{
            alert("Textarea is empty. Add a task!");
        }
    }

    return (
        <div>
            <button
                onClick={() => setOpenModalUpdate(true)}
                className='btn btn-primary w-full transition-colors duration-300 ease-in-out bg-dodgerblue hover:bg-green'
            >
                Add a New Task
                
                <AiOutlinePlus className="ml-2 bg-transparent" style={{ background: 'transparent' }} size={18} />
            </button>
            <AddUpdateModal selectedDate={selectedDate} setSelectedDate={setSelectedDate} action="Add" openModalUpdate={openModalUpdate} setOpenModalUpdate={setOpenModalUpdate} taskToEdit={newTask} setTaskToEdit={setNewTask} handleSubmitUpdateTodo={handleSubmitAddTodo} />
        </div>
    )
}

export default AddTask