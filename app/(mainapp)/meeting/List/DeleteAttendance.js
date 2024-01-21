"use client"
import RotateLoader from '@/components/LoadingSpinner/RotateLoader'
import { baseURL, myAxios } from '@/utils/utils'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { toast } from 'react-toastify'
import io from "socket.io-client"
const DeleteAttendance = ({ id, courseId }) => {
    const socket = io(baseURL)
    const { mutate, isLoading } = useMutation(async () => {
        const { data } = await myAxios.delete(`/attendance/delete/${id}?course=${courseId}`)
        return data
    }, {
        onSuccess({ message }) {
            toast(message, { type: "success" })
        },
        onError({ response: { data: { message } } }) {
            toast(message, { type: "error" })
        },
        onSettled() {
            socket.emit("allAttendance", null)
        }
    })
    const deleteHandler = () => {
        mutate()
    }
    if (isLoading) return <div className='flex justify-center items-center'> <RotateLoader width={25} /></div>
    return (
        <div onClick={deleteHandler} className='text-center text-red-600 hover:opacity-60 flex justify-center border w-7 h-7 items-center rounded-md cursor-pointer mx-auto '>
            <MdOutlineDeleteOutline size={20} />
        </div>
    )
}

export default DeleteAttendance