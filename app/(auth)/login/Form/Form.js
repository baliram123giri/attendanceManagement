"use client"
import React, { useCallback, useState } from 'react'
import { FaRegUser, FaUnlock } from "react-icons/fa6";
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
import { LuEye, LuEyeOff } from 'react-icons/lu';
import AppInput from '@/components/Inputs/AppInput';

const Form = () => {
    const [showpass, setShowpass] = useState(false);
    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onChange"
    })
    const [loader, setLoader] = useState(false)
    const { mutate } = useMutation(loginApi, {
        onSuccess: async function (data) {
            toast("User Logged in successfully...", { type: "success", position: "top-center" })
            location.href = "/"
        },
        onError({ response: { data: { message } } }) {
            toast(message, { type: "error", position: "top-center" })
        },
        onSettled() {
            setLoader(false)
        }
    })

    const ShowHideComp = useCallback(
        function () {
            return {
                type: showpass ? "text" : "password",
                endIcon: (
                    <div
                        className="cursor-pointer px-2"
                        onClick={() =>
                            setShowpass(!showpass)
                        }
                    >
                        {showpass ? <LuEye /> : <LuEyeOff />}
                    </div>
                ),
            };
        },
        [showpass]
    );

    const onSubmit = async (value) => {
        setLoader(true)
        try {
            const user = await signIn("credentials", { email: value.email, password: value.password, redirect: false })
            if (user.ok) {
                mutate(value)
            } else {
                setLoader(false)
            }
        } catch (error) {
            console.log(error)
        }
        // mutate(value)
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
                    <FaUnlock size={20} />
                    <AppInput {...{
                        ...ShowHideComp()
                    }} register={register} placeholder='Password*' watch={watch} errors={errors} name={"password"} />
                </div>
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
            <div className='text-xs text-center flex justify-between flex-wrap'>
                <div>                <span>{`Don't Have Account?`}</span> <Link className='text-main-app-secondary hover:text-main-app-secondary/90' href={"/register"}>Sign Up</Link></div>
                <Link className='text-main-app-error hover:text-main-app-secondary/90' href={"/forgetpassword"}>Forget Password</Link>
            </div>
        </form>
    )
}

export default Form