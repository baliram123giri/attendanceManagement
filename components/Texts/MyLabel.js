import React from 'react'

const MyLabel = ({ name, required, label }) => {
    return (
        <label htmlFor={name} className='text-b-sm font-semibold'>{label} {required && <span className='text-red-600'>*</span>}</label>
    )
}

export default MyLabel