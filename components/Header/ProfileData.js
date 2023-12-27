"use client"
import { useSession } from 'next-auth/react'
import React, { useContext, useEffect, useState } from 'react'
import LogoutBtn from './LogoutBtn'

import Notification from './Notification';

import { IoMdMenu } from "react-icons/io";
import Aside from '../Aside/Aside';
import UserData from './UserData';
import { usePathname } from 'next/navigation';
import { ChatContex } from '@/Provider/contexApi/ChatContext';
const ProfileData = () => {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    useEffect(() => {
        setOpen(false)
    }, [pathname])
    const { notifications } = useContext(ChatContex)
    const unreadNotifications = notifications?.filter(({ isRead }) => isRead === false) || []
    const count = pathname === "/chats" ? 0 : unreadNotifications?.length
    return (
        <>
            <div className='lg:hidden'>
                <div className='relative'>
                    <IoMdMenu onClick={() => setOpen(true)} size={30} className='cursor-pointer' />
                    {count > 0 && !open && <div className='absolute top-[5px] right-0 w-3 bg-main-app-secondary h-3 rounded-full '></div>}
                </div>
                {open && <div className='absolute z-10 left-0 h-[110vh] bg-neutral-950/10 w-full top-0 lg:hidden'>
                    <Aside count={count} open={open} setOpen={setOpen} />
                </div>}
            </div>
            <div className='lg:flex hidden'>
                <UserData />
            </div>
        </>


    )
}

export default ProfileData