"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { addressValidation } from './validation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';

import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import AppInput from '@/components/Inputs/AppInput';
import MyLabel from '@/components/Texts/MyLabel';
import { myAxios, setValues, statusHandler } from '@/utils/utils';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';


const AddressInfo = ({ stateOptions = [] }) => {
    const session = useSession()
    const [isEdit, setIsEdit] = useState(false)
    const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(addressValidation()),
        mode: "onChange"
    })

    //update address
    const { mutate, isLoading } = useMutation(async (values) => {
        const { data } = await myAxios.put(`/users/update/account/info`, values)
        return data
    }, {
        ...statusHandler(),
        onSuccess: async function ({ data: address, message }) {
            await session.update({ ...session.data.user, address })
            toast(message, { type: "success" })
            setIsEdit(false)
        }
    })

    const onSubmit = (value) => {
        try {
            if (isEdit) {
                //update
                mutate(value)
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
                name: "address",
                placeholder: "Enter Address*",
                label: "Address",
                required: true,

            },
            {
                id: 2,
                name: "state",
                type: "select",
                placeholder: "State*",
                options: stateOptions || [],
                required: true,
                label: "State",

            },
            {
                id: 3,
                name: "city",
                placeholder: "Enter City*",
                label: "City",
                required: true,
            },
            {
                id: 4,
                name: "pincode",
                type: "number",
                placeholder: "Enter Pincode*",
                label: "Pincode",
                required: true,
            },

        ],
        [stateOptions]
    );


    //set inital values
    const ResetValues = useCallback(function () {
        const { address } = session.data?.user
        setValues(setValue, address)
    }, [session.data?.user, setValue])


    //update default values
    useEffect(() => {
        if (session) {
            if (session?.data) {
                ResetValues()
            }
        }
    }, [session, ResetValues])

    return (
        <form onSubmit={!isEdit || handleSubmit(onSubmit)} className='w-full lg:w-[48%] shadow-sm border p-4 rounded-md' >
            <h6 className='text-xl font-semibold'>Address Info</h6>
            <div className="flex items-center justify-between lg:py-4 flex-wrap">
                {inputs.map(({ width, ...input }) =>
                    <div key={input.id} className={`w-full lg:w-[${width || 48}%] mt-3`}> <AppInput watch={watch} edit={isEdit} {...input} register={register} errors={errors} /></div>
                )}
            </div>
            <div className='flex items-center flex-wrap gap-2  my-1 lg:m-0'>
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

export default AddressInfo