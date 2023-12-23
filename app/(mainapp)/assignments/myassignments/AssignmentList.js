
"use client"
import RotateLoader from '@/components/LoadingSpinner/RotateLoader';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import AssigmentCards from './AssigmentCards';
import { myAxios } from '@/utils/utils';
import { useInView } from 'react-intersection-observer';



const AssignmentList = () => {
    const [data, setData] = useState([])
    const [metaData, setMetaData] = useState({})
    const [page, setpage] = useState(1)
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
    });

    const { isLoading, mutate } = useMutation(async (page) => {
        const { data } = await myAxios.get(`/assignment/list?page=${page}&limit=5`);
        return data
    }, {
        onSuccess({ data, metadata }) {
            setData((prev) => [...prev, ...data])
            setMetaData(metadata)
            if (page <= metadata?.totalPages) {
                setpage(page + 1)
            }
        }
    })
    useEffect(() => {
        mutate(page)
    }, [mutate])

    useEffect(() => {
        if (inView && page <= metaData?.totalPages) {
            mutate(page)
        }
    }, [inView, metaData?.totalPages, mutate])


    return (
        <>
            <div className={`flex flex-wrap gap-5  ${data?.length > 3 ? "justify-center" : ""}`}>
                {data?.map((ele) => {
                    return <AssigmentCards key={ele?._id} mutate={() => {
                        mutate(1)
                        setpage(1)
                        setData([])
                    }} {...ele} />
                })}
                <div ref={ref} className="flex items-center justify-center w-full">{isLoading && <RotateLoader />}</div>
            </div>

        </>
    )
}

export default AssignmentList