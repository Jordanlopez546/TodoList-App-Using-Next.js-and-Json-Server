"use client";

import { ITask } from '@/types/tasks';
import React, {useState, FormEventHandler} from 'react'
import { addDays, format, parseISO } from 'date-fns';
import {FiTrash2} from 'react-icons/fi'
import Swal from 'sweetalert2';
import Modal from './Modal';
import { deleteTodoTask } from '@/api';


interface TaskProps {
    task: ITask;
    setTasks: React.Dispatch<React.SetStateAction<ITask>>
}

const ExpiredTask: React.FC<TaskProps> = ({task, setTasks}) => {

    const [openModalDeleted, setOpenModalDelete] = useState<boolean>(false);

    let formattedDate = "Invalid Date";
    let parsedDate; // Declare parsedDate outside of try-catch block.

    try {
        parsedDate = parseISO(task.date);
        formattedDate = format(parsedDate, 'dd/MM/yyyy');
    } catch (error) {
        console.error("Error parsing or formatting date:", error);
    }

    const handleDeleteTask = async(id: string) => {
        try {
            // Call the API to delete the task
            await deleteTodoTask(id);

            // Remove the deleted task from the tasks list
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

            setOpenModalDelete(false);
            Swal.fire('Success!', 'The task was deleted successfully', 'success');
        } 
        catch (error) {
            console.error('Error deleting task:', error);
            Swal.fire('Error', 'An error occurred while deleting the task', 'error');
        }
    }

    const today = new Date();
    const minSelectableDate = addDays(today, -1);

    return (
        <tr key={task.id}>
            {parsedDate < minSelectableDate ? (
                <>
                    <td className='text-black font-normal text-base w-full'>{task.task}</td>
                    <td className='text-black font-normal text-base'>{formattedDate}</td>
                    <div className='flex flex-row items-center justify-center p-3'>
                        <span className=" ml-3 mr-2 text-base-500 text-red-500">Delete</span>
                        <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor='pointer' size={20} className='text-red-500' />
                    </div>
                    <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDelete}>
                            <h3 className='text-lg text-black'>Are you sure you want to delete this task?</h3>
                            <div className='modal-action'>
                                <button onClick={() => handleDeleteTask(task.id)} className='btn bg-blue-500 hover:bg-green text-white'>Yes</button>
                            </div>
                    </Modal>
                </>
            ) : ""}
        </tr>
    )
}

export default ExpiredTask