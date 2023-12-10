import React from 'react'
import dynamic from 'next/dynamic'
const Calendar = dynamic(() => import('./MyCalender/Calendar'), { ssr: false })
const MyAttendance = () => {
    return (
        <div>
            <Calendar />
        </div>
    )
}

export default MyAttendance