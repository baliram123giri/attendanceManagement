import React from 'react'
import "./modal.css"
import { IoMdClose } from "react-icons/io";
const Modal = ({ width = 30, children, title, setOpen, open }) => {
    if (!open) return null
    return (
        <div className='modal'>
            <div style={{ width: `${width}%` }} className='overlay'>
                <div className='py-2 border-b flex justify-between items-center px-4'>
                    <h3>{title}</h3>
                    <button onClick={() => setOpen && setOpen(false)} className='border-none cursor-pointer text-gray-500'><IoMdClose size={20} /></button>
                </div>
                <div className='px-4'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal