"use client"
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { StreamValidation } from './validation'
import AppInput from '@/components/Inputs/AppInput'
import { useMutation } from '@tanstack/react-query'
import { myAxios, statusHandler } from '@/utils/utils'
import AppButton from '@/components/Buttons/AppButton'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const Form = ({ editId }) => {
    const { back, refresh, replace } = useRouter()
    const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(StreamValidation)
    })
    //call api to add new stream
    const { isLoading, mutate } = useMutation(async (value) => {
        const { data } = await myAxios.post(`/stream/create`, value)
        return data
    }, {
        ...statusHandler(),
        onSuccess({ message }) {
            toast(message, { type: "success" })
            //back is use for redirect to last visited page
            refresh()
            back()
        }
    })

    //fecth edit stream
    const { isLoading: isLoadingEditStream, mutate: mutateEditStream } = useMutation(async () => {
        const { data } = await myAxios.get(`/stream/${editId}`)
        return data
    }, {
        onSuccess({ name }) {
            setValue("name", name)
        }
    })
    //Update  stream
    const { isLoading: isLoadingUpdateStream, mutate: mutateUpdateStream } = useMutation(async (value) => {
        const { data } = await myAxios.put(`/stream/update/${editId}`, value)
        return data
    }, {
        ...statusHandler(),
        onSuccess({ message }) {
            toast(message, { type: "success" })
            refresh()
            replace("/stream")
        }
    })

    const onSubmit = (value) => {
        if (editId) {
            mutateUpdateStream(value)
        } else {
            mutate(value)
        }

    }

    useEffect(() => {
        if (editId) {
            mutateEditStream()
        }
    }, [editId, mutateEditStream])

    return (
        <div className='bg-white border shadow p-4 w-full lg:w-[48%] mt-2'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AppInput watch={watch} errors={errors} register={register} required={true} label={"Stream"} name={"name"} placeholder={isLoadingEditStream ? "Loading..." : "Enter Stream Name"} />
                <div className='flex gap-1'>
                    <AppButton isLoading={isLoading || isLoadingUpdateStream} className={`rounded-full my-3`} >{editId ? "Edit" : "Add New"}  Stream </AppButton>
                    <AppButton onClick={() => replace("/stream")} type='button' className={`rounded-full my-3 `} color='bg-main-app-error' >Cancel</AppButton>
                </div>
            </form>
        </div>
    )
}

export default Form