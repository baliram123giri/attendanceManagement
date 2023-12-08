"use client"
import { baseURL, myAxios } from '@/utils/utils';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { CiLock } from "react-icons/ci";
import { toast } from 'react-toastify';
import RotateLoader from '../LoadingSpinner/RotateLoader';
import { useRouter } from 'next/navigation';

const LogoutBtn = () => {
    const { replace } = useRouter()
    const { isLoading, mutate } = useMutation(async () => {
        try {
            const { data } = await myAxios.get(`/users/logout`)
            return data
        } catch (error) {
            console.log(error.response)
        }
    }, {
        onSuccess({ message }) {
            toast(message, { type: "success" })
            replace(`${process.env.NODE_ENV === "development" ? "" : "https://app.bgtechub.com/logout"}/logout`)
        },
        onError({ response: { data: { message } } }) {
            toast(message, { type: "error" })
        }
    })
    if (isLoading) return <div className='flex items-center justify-center'><RotateLoader width={20} /></div>
    return (
        <div onClick={mutate} className='bg-white border rounded-md p-1 shadow-sm'><CiLock size={25} /></div>
    )
}

export default LogoutBtn