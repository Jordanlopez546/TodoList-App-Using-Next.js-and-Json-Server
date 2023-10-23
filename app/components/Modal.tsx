import React from 'react'

interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => boolean | void;
    children: React.ReactNode
}


const Modal: React.FC<ModalProps> = ({modalOpen, setModalOpen, children}) => {
    // setData([newValue, ...data])
    return (
        <div className={`modal ${modalOpen ? "modal-open" : ""} bg-white`}>
            <div className='modal-box relative bg-white'>
                <label className='btn btn-sm btn-circle bg-blue-500 hover:bg-green text-white absolute right-2 top-2' onClick={() => setModalOpen(false)}>x</label>
                {children}
            </div>
        </div>
    )
}

export default Modal