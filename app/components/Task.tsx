"use client";

import { ITask } from '@/types/tasks';
import React, {useState, FormEventHandler} from 'react'
import {FiEdit, FiTrash2} from 'react-icons/fi'
import Modal from './Modal';
import { addTodoTask, deleteTodoTask, updateTodoTask } from '@/api';
import AddUpdateModal from './AddUpdateModal';
import { addDays, format, parseISO, differenceInCalendarDays   } from 'date-fns';
import Swal from 'sweetalert2';


interface TaskProps {
    task: ITask;
    setTasks: React.Dispatch<React.SetStateAction<ITask>>
}

const Task: React.FC<TaskProps> = ({task, setTasks}) => {

    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.task);
    const [selectedDate, setSelectedDate] = useState<string>(task.date);

    const handleSubmitUpdateTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (taskToEdit.trim() !== "") {
            if (selectedDate.trim() !== "") {
                // Update the task with new task and date values
                const updatedTask = {
                    ...task,
                    task: taskToEdit,
                    date: selectedDate
                };

                await updateTodoTask({
                    id: task.id,
                    task: taskToEdit,
                    date: selectedDate
                });

                setTasks((prevTasks) => {
                    return prevTasks.map((t) => (t.id === task.id ? updatedTask : t));
                });

                setOpenModalUpdate(false);
                Swal.fire('Success!', 'The task was updated successfully', 'success');
            }
            else {
                alert("Datefield is empty. Add an expiry date!");
            }
        }
        else{
            alert("Textarea is empty. Add a task!");
        }
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
    const daysDifference = differenceInCalendarDays(parsedDate, today); // Use differenceInCalendarDays

    return (
        <tr key={task.id}>
            {parsedDate > minSelectableDate ? (
                <>
                    {
                        daysDifference <= 2 ? (
                            <>
                                <td className='text-red-700 font-bold text-base w-full'>{task.task}</td>
                                <td className='text-red-700 font-bold text-base'>{formattedDate}</td>
                            </> 
                        ) : (
                            <>
                                <td className='text-black font-normal text-base w-full'>{task.task}</td>
                                <td className='text-black font-normal text-base'>{formattedDate}</td>
                            </>
                        )
                    }
                    <td className='flex flex-row items-center '>
                        <span className="mr-2 text-base-500 text-blue-500">Update</span>
                        <FiEdit onClick={() => setOpenModalUpdate(true)} cursor='pointer' size={20} className='text-blue-500' />
                        <AddUpdateModal selectedDate={selectedDate} setSelectedDate={setSelectedDate} action="Update" openModalUpdate={openModalUpdate} setOpenModalUpdate={setOpenModalUpdate} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} handleSubmitUpdateTodo={handleSubmitUpdateTodo} />
                        <span className=" ml-3 mr-2 text-base-500 text-red-500">Delete</span>
                        <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor='pointer' size={20} className='text-red-500' />
                        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDelete}>
                            <h3 className='text-lg text-black'>Are you sure you want to delete this task?</h3>
                            <div className='modal-action'>
                                <button onClick={() => handleDeleteTask(task.id)} className='btn bg-blue-500 hover:bg-green text-white'>Yes</button>
                            </div>
                        </Modal>
                    </td>
                </>
            ) : null}
        </tr>
    )
}

export default Task