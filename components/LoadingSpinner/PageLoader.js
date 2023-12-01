"use client"
import React from 'react'
import { Blocks } from 'react-loader-spinner'

const PageLoader = () => {
    return (
        <div className='min-h-[50px] w-full flex justify-center items-center'>
            <Blocks
                visible={true}
                height="60"
                width="60"
                color='#FF9130'
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper bg-app-main-theme"
            />
        </div>
    )
}

export default PageLoader