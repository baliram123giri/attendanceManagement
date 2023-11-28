"use client"
import React from 'react'
import { FaRegUser } from "react-icons/fa6";
import { FaUnlockAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from './validation';
const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onChange"
    })

    const onSubmit = (value) => {

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' >
            <div>
                <div className='flex items-center gap-2'>
                    <FaRegUser size={20} />
                    <input {...register("email")} placeholder='Username' type="text" className='bg-white/5 text-xs rounded-sm border-white border focus:outline-none px-2 p-2 w-full' />
                </div>
                {errors.email && <span className='text-red-400 text-xs ps-6'> {errors.email.message} </span>}
            </div>
            <div>
                <div className='flex items-center gap-2'>
                    <FaUnlockAlt size={20} />
                    <input {...register("password")} placeholder='Password' type="password" className='bg-white/5 text-xs rounded-sm border-white border focus:outline-none px-2 p-2 w-full' />
                </div>
                {errors.password && <span className='text-red-400 text-xs ps-6'> {errors.password.message} </span>}
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 ps-1'>
                    <input type="checkbox" id='remeber' />
                    <label htmlFor="remeber" className='text-xs select-none hover:text-blue-200'>Remember Me</label>
                </div>
                <button className='bg-man-app-secondary px-5 hover:bg-man-app-secondary/80 rounded-sm text-xs p-1'>
                    Login
                </button>
            </div>
        </form>
    )
}

export default Form