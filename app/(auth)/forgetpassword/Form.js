"use client"
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'

import { myAxios, statusHandler } from '@/utils/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaArrowLeft } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'
import * as Yup from "yup"
const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(Yup.object().shape({
            email: Yup.string().email("Invalid Email").required("Email is required")
        })),
        mode: "onChange"
    })


    const { mutate, isLoading, data } = useMutation(async (value) => {
        const { data } = await myAxios.post(`/users/forgetpassword`, value)
        return data
    }, { ...statusHandler() })

    const onSubmit = async (value) => {
        try {
            mutate(value)
        } catch (error) {
            console.log(error)
        }
    }

    if (data) return (
        <div className='text-center'>
            <p className='text-xs'>{data?.message}</p>
            <button>
                <Link href={"/login"} className='flex items-center text-xs gap-1'>  <FaArrowLeft /> Go Back</Link>
            </button>
        </div>
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' >
            <div>
                {/* <MyLabel label={"Email"} required={true} name={"Email"} /> */}
                <div className='flex items-center gap-2'>
                    <MdEmail size={20} />
                    <input {...register("email")} placeholder='Email*' type="text" className='bg-white/5 text-xs rounded-sm border-white border focus:outline-none px-2 p-2 w-full' />
                </div>
                {errors.email && <span className='text-red-400 text-xs ps-6'> {errors.email.message} </span>}
            </div>
            <div className="flex gap-3 flex-wrap items-center">
                <button disabled={isLoading} className='bg-main-app-secondary px-5 ms-6  hover:bg-main-app-secondary/80 rounded-sm text-xs p-1'>
                    {isLoading ? <LoadingSpinner /> : "Send Email"}
                </button>
                <Link className='text-white text-xs hover:text-main-app-secondary/90' href={"/login"}>Login</Link>

            </div>

        </form>
    )
}

export default Form