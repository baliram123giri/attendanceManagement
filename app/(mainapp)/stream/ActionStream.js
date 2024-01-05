"use client"
import RotateLoader from '@/components/LoadingSpinner/RotateLoader'
import { myAxios } from '@/utils/utils'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { toast } from 'react-toastify'
import { useRouter } from "next/navigation"
import { FaRegEdit } from "react-icons/fa";
const ActionStream = ({ streamId }) => {
    const { refresh, replace } = useRouter()
    const { mutate, isLoading } = useMutation(async () => {
        const { data } = await myAxios.delete(`/stream/delete/${streamId}`)
        return data
    }, {
        onSuccess({ message }) {
            toast(message, { type: "success" })
            //refresh current page
            refresh()
        },
        onError({ response: { data: { message } } }) {
            toast(message, { type: "error" })
        }
    })
    const deleteHandler = () => {
        mutate()
    }
    if (isLoading) return <div className='flex justify-center items-center'> <RotateLoader width={25} /></div>
    return (
        <div className='flex  justify-center gap-2'>
            <div onClick={() => replace(`/stream/edit/${streamId}`)} className='text-center text-main-app-error hover:opacity-60 flex justify-center border border-main-app-error w-6 h-6 items-center rounded-md cursor-pointer  '>
                <FaRegEdit size={15} />
            </div>
            <div onClick={deleteHandler} className='text-center text-red-600 hover:opacity-60 flex justify-center border border-red-600 w-6 h-6 items-center rounded-md cursor-pointer  '>
                <MdOutlineDeleteOutline size={18} />
            </div>
        </div>

    )
}

export default ActionStream