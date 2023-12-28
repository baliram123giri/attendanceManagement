"use client"
import { myAxios } from '@/utils/utils';
import { useMutation } from '@tanstack/react-query';
import React from 'react'
import { CiLock } from "react-icons/ci";
import { toast } from 'react-toastify';
import RotateLoader from '../LoadingSpinner/RotateLoader';

import { signOut } from 'next-auth/react';

const LogoutBtn = () => {

    const { isLoading, mutate } = useMutation(async () => {
        try {
            const { data } = await myAxios.get(`/users/logout`)
            return data
        } catch (error) {
            console.log(error.response)
        }
    }, {
        onSuccess: async function ({ message }) {
            toast(message, { type: "success" })
            await signOut().then(() => {
                window.location.reload()
            })
        },
        onError({ response: { data: { message } } }) {
            toast(message, { type: "error" })
        }
    })
    if (isLoading) return <div className='flex items-center justify-center'><RotateLoader width={20} /></div>
    return (
        <div onClick={mutate} className='bg-white border lg:rounded-md p-1 shadow-sm flex items-center gap-1'><CiLock size={25} /> <span className='lg:hidden'>Logout</span></div>
    )
}

export default LogoutBtn