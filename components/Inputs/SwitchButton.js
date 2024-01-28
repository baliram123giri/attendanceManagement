"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'

const SwitchButton = ({ id, defaultChecked, onCheck }) => {
    const [checked, setCheked] = useState()
    useEffect(() => {
        setCheked(defaultChecked)
    }, [defaultChecked])
    
    return (
        <div >
            <label htmlFor={`switch_${id}`} className={`${!checked ? "bg-main-app-primary" : "bg-main-app-error"} rounded-full shadow h-[20px] relative cursor-pointer`}>
                <div className={`w-[15px] border h-[15px] rounded-full shadow-xl absolute top-0 bg-white ${!checked ? "left-0" : "right-0"}`}></div>
                <input checked={checked} onChange={({ target: { checked } }) => {
                    setCheked(checked)
                    onCheck && onCheck(checked)
                }} type="checkbox" id={`switch_${id}`} className='w-[30px] opacity-0 h-full bg-green-300  cursor-pointer ' />
            </label>
        </div >
    )
}

export default SwitchButton