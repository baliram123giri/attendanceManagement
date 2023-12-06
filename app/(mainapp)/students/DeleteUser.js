"use client"
import RotateLoader from '@/components/LoadingSpinner/RotateLoader'
import { myAxios } from '@/utils/utils'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { toast } from 'react-toastify'
import { useRouter } from "next/navigation"

const DeleteUser = ({ userid }) => {
    const { refresh } = useRouter()
    const { mutate, isLoading } = useMutation(async () => {
        const { data } = await myAxios.delete(`/users/delete/${userid}`)
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
        <div onClick={deleteHandler} className='text-center text-red-600 hover:opacity-60 flex justify-center border w-7 h-7 items-center rounded-md cursor-pointer mx-auto '>
            <MdOutlineDeleteOutline size={20} />
        </div>
    )
}

export default DeleteUser