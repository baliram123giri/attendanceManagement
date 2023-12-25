"use client"
import PasswordChange from '@/app/(mainapp)/settings/AccountInfo/PasswordChange'
import { myAxios, statusHandler } from '@/utils/utils'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { toast } from 'react-toastify'

const Form = ({ token }) => {

    const { mutate, isLoading, data } = useMutation(async (value) => {
        const { data } = await myAxios.put(`/users/changepassword`, value)
        return data
    }, { ...statusHandler() })

    const onSubmit = (value) => {
        if (value && token) {
            mutate({ ...value, token })
        } else {
            toast("Password and token is required to reset password")
        }
    }
    if (data) {
        return <div className='text-center'>
            <p className='text-xs'>{data?.message}</p>
            <button>
                <Link href={"/login"} className='flex items-center text-xs gap-1'>  <FaArrowLeft /> Go Back</Link>
            </button>
        </div>
    }
    return (
        <div>
            <PasswordChange onSubmitCallback={onSubmit} isRest Loading={isLoading} />
        </div>
    )
}

export default Form