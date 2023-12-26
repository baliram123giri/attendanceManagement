"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema, updateAccountValidation } from './validation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';

import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import AppInput from '@/components/Inputs/AppInput';
import MyLabel from '@/components/Texts/MyLabel';
import { myAxios, setValues, statusHandler } from '@/utils/utils';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import Image from 'next/image';


const AccountInfo = () => {
    const session = useSession()
    const [isEdit, setIsEdit] = useState(false)
    const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(updateAccountValidation()),
        mode: "onChange"
    })


    const { mutate, isLoading } = useMutation(async (values) => {
        const { data } = await myAxios.put(`/users/update/account/info`, values, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        return data
    }, {
        ...statusHandler(),
        onSuccess: async function ({ data, message }) {
            await session.update(data).then(() => console.log("done"))
            toast(message, { type: "success" })
            setIsEdit(false)
        }
    })

    const onSubmit = async (value) => {
        try {
            if (isEdit) {
                const { name, email, mobile, avatar } = value
                const formData = new FormData()
                formData.append("name", name)
                formData.append("email", email)
                formData.append("mobile", mobile)
                if (avatar.length == 1) {
                    formData.append("avatar", avatar[0])
                }
                //update
                mutate(formData)
            }
        } catch (error) {
            console.log(error)
        }
        // mutate(value)
    }

    const inputs = useMemo(
        () => [
            {
                id: 1,
                name: "name",
                placeholder: "Enter Name*",
                label: "Name",
                required: true,

            },
            {
                id: 2,
                name: "mobile",
                type: "number",
                placeholder: "Enter Mobile*",
                label: "Mobile",
                required: true,

            },
            {
                id: 3,
                name: "email",
                placeholder: "Enter Email*",
                label: "Email",
                required: true,
                ...(isEdit ? { width: 100 } : {})
            },

        ],
        [isEdit]
    );
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setValue('avatar', file);
    };

    //set inital values
    const ResetValues = useCallback(function () {
        const { email, name, mobile, avatar } = session.data?.user
        setValues(setValue, { email, name, mobile, avatar })
    }, [session, setValue])

    //update default values
    useEffect(() => {
        if (session) {
            if (session?.data) {
                ResetValues()
            }
        }
    }, [session, ResetValues])

    return (
        <form onSubmit={!isEdit || handleSubmit(onSubmit)} className='w-full lg:w-[48%] mt-2 shadow-sm border p-4 rounded-md' >
            <h6 className='text-xl font-semibold'>Account Info</h6>
            <div className={`flex items-center ${isEdit ? "justify-between" : "gap-3"} lg:py-4 flex-wrap`}>
                {inputs.map(({ width, ...input }) =>
                    <div key={input.id} className={`w-full lg:w-[${width || 48}%] mt-3`}> <AppInput watch={watch} {...input} edit={isEdit} register={register} errors={errors} /></div>
                )}
                {isEdit && <div className="flex flex-col w-full py-1   mt-3   text-sm relative">
                    <div className='border rounded-sm top-0 flex justify-center items-center absolute h-full w-full'>
                        <small>Upload Photo</small>
                    </div>

                    <input type="file" onChange={handleFileChange} accept="image/*" className='opacity-0'  {...register("avatar")} />

                </div>}
                {!isEdit && watch("avatar") && <div className='flex flex-col mt-3 '>
                    <MyLabel name={"avatar"} label={"Profile Photo"} required={true} />
                    <div className='w-8 h-8 relative my-1 lg:m-0 '><Image src={watch("avatar")} alt='Avatar' layout='fill' />
                    </div>
                </div>}
                {errors?.["avatar"] && (
                    <span className="text-xs text-red-600  mt-2">{errors["avatar"].message}</span>
                )}
            </div>
            <div className='flex items-center flex-wrap gap-2 my-1 lg:m-0'>
                {isEdit && <button disabled={isLoading} className={`bg-main-app-secondary hover:bg-main-app-secondary/70  px-5 text-white rounded-full   text-xs p-2`}>
                    {isLoading ? <LoadingSpinner /> : "Save Changes"}
                </button>}
                <button type='button' onClick={() => {
                    setIsEdit(!isEdit)
                    ResetValues()
                }} disabled={isLoading} className={`bg-main-app-error hover:bg-main-app-error/70 px-5 text-white rounded-full   text-xs p-2`}>
                    {isEdit ? "Cancel" : "Edit"}
                </button>
            </div>

        </form>
    )
}

export default AccountInfo