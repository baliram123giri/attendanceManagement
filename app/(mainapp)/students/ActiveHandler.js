"use client"
import SwitchButton from '@/components/Inputs/SwitchButton'
import RotateLoader from '@/components/LoadingSpinner/RotateLoader'
import { myAxios, statusHandler } from '@/utils/utils'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'

const ActiveHandler = ({ id, defaultChecked }) => {
    const { refresh } = useRouter()
    const { mutate, isLoading } = useMutation(async (value) => {
        const { data } = await myAxios.get(`/users/active/${id}/${value}`)
        return data
    }, {
        ...statusHandler(), onSettled() {
            refresh()
        }
    })

    if (isLoading) return <RotateLoader width={20} />
    return (
        <SwitchButton id={id} defaultChecked={defaultChecked} onCheck={mutate} />
    )
}

export default ActiveHandler