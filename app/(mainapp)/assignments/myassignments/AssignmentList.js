
"use client"
import RotateLoader from '@/components/LoadingSpinner/RotateLoader';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import AssigmentCards from './AssigmentCards';
import { myAxios } from '@/utils/utils';

const AssignmentList = () => {
    const { data, isLoading, mutate } = useMutation(async () => {
        const { data } = await myAxios.get('/assignment/list');
        return data
    })
    useEffect(() => {
        mutate()
    }, [mutate])

    if (isLoading) return <RotateLoader />
    return (
        <div className='flex flex-wrap gap-5 justify-center'>
            {data?.map((ele) => {
                return <AssigmentCards key={ele?._id} mutate={mutate} {...ele} />
            })}
        </div>
    )
}

export default AssignmentList