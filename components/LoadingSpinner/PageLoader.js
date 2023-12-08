
import React from 'react'
const PageLoader = () => {
    return (
        <div className="flex justify-center bg-gray-100 items-center w-full ms-auto  ">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-white-500"></div>
            <span className='text-xl inline-block ms-1'>Loading...</span>
        </div>
    )
}

export default PageLoader