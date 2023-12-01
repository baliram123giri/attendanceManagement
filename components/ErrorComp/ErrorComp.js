import React from 'react'
import { AiOutlineCheckCircle, AiOutlineExclamationCircle } from 'react-icons/ai'

const ErrorComp = ({ type, message }) => {
    if (type === "error") return <div className='bg-red-50 flex gap-1 items-center text-red-500 my-3 break-words px-2 p-2 font-semibold rounded-md'>
        <AiOutlineExclamationCircle />   <span className='text-xs'>{message}</span>
    </div>
    return (
        <div className='bg-green-50 flex gap-1 items-center text-green-500 my-3 break-words px-2 p-2 font-semibold rounded-md'>
            <AiOutlineCheckCircle />   <span className='text-xs'>{message}</span>
        </div>
    )
}

export default ErrorComp