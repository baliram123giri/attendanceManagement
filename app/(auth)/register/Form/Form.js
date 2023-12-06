"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from './validation';
import Link from 'next/link';
import AppInput from '@/components/Inputs/AppInput';
import { FaRegUser } from 'react-icons/fa6';
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUnlock } from "react-icons/fa";
import { useMutation } from '@tanstack/react-query';
import { myAxios } from '@/utils/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
const Form = () => {
    const { push } = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onChange"
    })
    const { isLoading, mutate } = useMutation(async (values) => {
        try {
            const { data } = await myAxios.post(`/user/register`, values)
            return data
        } catch (error) {
            console.log(error.response)
            toast(error?.response?.data?.message, { type: "error" })
        }
    }, {
        onSuccess({ message }) {
            toast(message, { type: "success" })
            push("/login")
        },

    })

    const onSubmit = (value) => {
        mutate(value)
    }
    const inputs = [
        {
            id: 1,
            name: "name",
            placeholder: "Full Name*",
            icon: <FaRegUser size={20} />
        },
        {
            id: 2,
            name: "mobile",
            placeholder: "Mobile*",
            type: "number",
            icon: <FaMobileAlt size={20} />
        },
        {
            id: 3,
            name: "email",
            placeholder: "Email*",
            icon: <MdOutlineMailOutline size={20} />
        },
        {
            id: 4,
            name: "password",
            placeholder: "Password*",
            icon: <FaUnlock size={20} />
        }
    ]
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4' >
            {inputs.map(({ id, icon, ...rest }) => {
                return <div key={id} className='flex items-center gap-2'> {icon} <AppInput register={register} errors={errors} {...rest} /></div>
            })}
            <div className=' ms-6 flex items-center justify-between'>
                <button disabled={isLoading} className='bg-main-app-secondary px-5 hover:bg-main-app-secondary/80 rounded-sm text-xs p-1'>
                    {isLoading ? <LoadingSpinner /> : "Register"}
                </button>
                <div className='text-xs text-center'>
                    <span>{`Don't Have Account?`}</span> <Link className='text-main-app-secondary hover:text-main-app-secondary/90' href={"/login"}>Sign In</Link>
                </div>
            </div>
        </form>
    )
}

export default Form