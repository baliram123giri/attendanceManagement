import Link from 'next/link'
import React from 'react'
import { FaPlusCircle } from 'react-icons/fa'

const AddBtn = ({ path, title }) => {
    return (
        <div className='flex gap-1 flex-wrap items-center bg-white p-2 text-sm shadow font-semibold '>
            <h6>{title}</h6> <Link href={path}>  <div className="flex items-center gap-1 border-main-app-secondary border p-1 text-main-app-secondary rounded-full"> <FaPlusCircle /></div></Link>
        </div>
    )
}

export default AddBtn