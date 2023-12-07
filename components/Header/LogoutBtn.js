"use client"
import { myAxios } from '@/utils/utils';
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
            replace("/logout")
        },
        onError({ response: { data: { message } } }) {
            toast(message, { type: "error" })
        }
    })
    if (isLoading) return <div className='flex items-center justify-center'><RotateLoader width={20} /></div>
    return (
        <div onClick={mutate}><CiLock size={25} /></div>
    )
}

export default LogoutBtn