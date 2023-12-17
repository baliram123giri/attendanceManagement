"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import LogoutBtn from './LogoutBtn'
import { IoIosNotifications } from "react-icons/io";
const ProfileData = () => {
    const session = useSession()
    if (!session) return null

    return (
        <div className='cursor-pointer flex items-center gap-2  relative '>
            <IoIosNotifications size={25}/>
            <h6 className='font-semibold group hover:text-blue-400'>{session?.data?.user?.name}</h6>
            <LogoutBtn />
        </div>

    )
}

export default ProfileData