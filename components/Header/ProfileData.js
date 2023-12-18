"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import LogoutBtn from './LogoutBtn'

import Notification from './Notification';
const ProfileData = () => {
    const session = useSession()

    if (!session) return null
    return (
        <div className='cursor-pointer flex items-center gap-2  relative '>
            <Notification />


            <h6 className='font-semibold group hover:text-blue-400'>{session?.data?.user?.name}</h6>
            <LogoutBtn />
        </div>

    )
}

export default ProfileData