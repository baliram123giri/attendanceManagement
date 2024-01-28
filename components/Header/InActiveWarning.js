"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const InActiveWarning = () => {
    const session = useSession()
    if (session?.data?.user?.role === "admin" || !session) return null
    return (
        <marquee behavior="" direction="" className="text-red-700 ">Please upload the assignment. There are <span className='font-semibold'>{15 - session?.data?.user?.inActiveTime}</span> days remaining before this account deactivates.</marquee>
    )
}

export default InActiveWarning