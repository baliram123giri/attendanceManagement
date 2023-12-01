"use client"
import React from 'react'
import MyLabel from '../Texts/MyLabel'


const AppSelect = ({ options = [], label, name, errors, required, register, onSelect }) => {
    return (
        <div className='flex flex-col gap-1 '>
            {label && <MyLabel name={name} label={label} required={required} />}
            <select className={`border rounded-md p-1.5 w-full`} {...register(name, { onChange: (e) => onSelect && onSelect(e) })} >
                <option value="">{`Select ${label || ""}`}</option>
                {Array.isArray(options) && options.map((ele, i) => {
                    return <option key={i} value={ele.value}>{ele.name}</option>
                })}
            </select>

            {errors?.[name] && <span className='text-xs text-red-600'>{errors[name].message}</span>}
        </div>
    )
}

export default AppSelect