"use client"
import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const InfiniteLoader = () => {
    return (
        <div className='min-h-[50px] w-full flex justify-center items-center'>
            <InfinitySpin
                width='200'
                color='#FF9130'
            />
        </div>

    )
}

export default InfiniteLoader