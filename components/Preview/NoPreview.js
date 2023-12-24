import React from 'react'
import { GrDocument } from "react-icons/gr";
const NoPreview = () => {
    return (
        <div className='flex flex-col items-center justify-center gap-5 h-full bg-gray-100 text-gray-700 rounded-t-md'>
            <GrDocument size={50} />
            <h6 className='text-sm'>No Preview Available!</h6>
        </div>
    )
}

export default NoPreview