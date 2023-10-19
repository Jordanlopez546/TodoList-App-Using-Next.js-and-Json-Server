import React from 'react'
import Modal from './Modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns'; // Import addDays function from date-fns


interface AddUpdateModalProps {
    openModalUpdate: boolean;
    setOpenModalUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmitUpdateTodo: (event: React.FormEvent) => void;
    taskToEdit: string;
    setTaskToEdit: React.Dispatch<React.SetStateAction<string>>;
    action: string;
    selectedDate: string;
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

const AddUpdateModal: React.FC<AddUpdateModalProps> = ({selectedDate, setSelectedDate, openModalUpdate, action, setOpenModalUpdate, handleSubmitUpdateTodo, taskToEdit, setTaskToEdit}) => {

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskToEdit(e.target.value);
    };

    const today = new Date();
    const minSelectableDate = addDays(today, 0); // Set a minimum date, 1 day after today

    return (
        <>
            <Modal modalOpen={openModalUpdate} setModalOpen={setOpenModalUpdate}>
                    <form onSubmit={handleSubmitUpdateTodo}>
                        <h3 className='font-bold text-lg text-black'>{action} Your Task</h3>
                        <div className='modal-action justify-between'>
                            <input
                                value={taskToEdit}
                                onChange={handleTextChange}
                                placeholder="Todo name"
                                className=" border border-gray-300 w-full h-12 bg-white rounded-md w-90 text-black"
                            />
                        </div>
                        <div className='modal-action justify-between'>
                            <DatePicker
                                placeholderText='Expiry date'
                                selected={selectedDate ? new Date(selectedDate) : null}
                                onChange={(date) => setSelectedDate(date ? date.toISOString() : '')} 
                                dateFormat='dd/MM/yyyy' // Set the desired format
                                className='border border-gray-300 w-full bg-white rounded-md w-90 text-black'
                                minDate={minSelectableDate} // Set the minimum selectable date
                                />

                            <button type='submit' className='btn bg-blue-500 hover:bg-green text-white'>
                                {action}
                            </button>
                        </div>
                    </form>
            </Modal>
        </>
    )
}


export default AddUpdateModal