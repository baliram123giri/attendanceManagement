"use client"
import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa6";
import { FaUnlockAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from './validation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from './service';
import { toast } from 'react-toastify';

import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { signIn } from 'next-auth/react';
const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onChange"
    })
    const isDevlopment = process.env.NODE_ENV === "development"
    const [loader, setLoader] = useState(false)
    const { mutate } = useMutation(loginApi, {
        onMutate() {
            setLoader(true)
        },
        onSuccess: async function (data) {
            localStorage.setItem("token", JSON.stringify(data?.token))
            await signIn("credentials", { redirect: false, user: data })
            toast("User Logged in successfully...", { type: "success", position: "top-center" })
            location.href = isDevlopment ? "http://localhost:3000" : "https://app.bgtechub.com"
        },
        onError({ response: { data: { message } } }) {
            toast(message, { type: "error", position: "top-center" })
        },
        onSettled() {
            setLoader(false)
        }
    })

    const onSubmit = (value) => {
        mutate(value)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' >
            <div>
                <div className='flex items-center gap-2'>
                    <FaRegUser size={20} />
                    <input {...register("email")} placeholder='Username*' type="text" className='bg-white/5 text-xs rounded-sm border-white border focus:outline-none px-2 p-2 w-full' />
                </div>
                {errors.email && <span className='text-red-400 text-xs ps-6'> {errors.email.message} </span>}
            </div>
            <div>
                <div className='flex items-center gap-2'>
                    <FaUnlockAlt size={20} />
                    <input {...register("password")} placeholder='Password*' type="password" className='bg-white/5 text-xs rounded-sm border-white border focus:outline-none px-2 p-2 w-full' />
                </div>
                {errors.password && <span className='text-red-400 text-xs ps-6'> {errors.password.message} </span>}
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 ps-1'>
                    <input type="checkbox" id='remeber' />
                    <label htmlFor="remeber" className='text-xs select-none hover:text-blue-200'>Remember Me</label>
                </div>
                <button className='bg-main-app-secondary px-5 hover:bg-main-app-secondary/80 rounded-sm text-xs p-1'>
                    {loader ? <LoadingSpinner /> : "Login"}
                </button>
            </div>
            <div className='text-xs text-center'>
                <span>{`Don't Have Account?`}</span> <Link className='text-main-app-secondary hover:text-main-app-secondary/90' href={"/register"}>Sign Up</Link>
            </div>
        </form>
    )
}

export default Form