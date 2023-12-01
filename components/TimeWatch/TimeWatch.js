"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import { IoMdStopwatch } from "react-icons/io";
const TimeWatch = () => {
    const [currentTime, setCurrentTime] = useState(new Date())
    useEffect(() => {
        const timeRefresh = setTimeout(() => {
            setCurrentTime(new Date())
        }, 1000);

        return () => clearInterval(timeRefresh)
    }, [currentTime])

    return (
        <div className='flex gap-1 items-center'><IoMdStopwatch  size={16} />{currentTime.toLocaleTimeString()}</div>
    )
}

export default TimeWatch