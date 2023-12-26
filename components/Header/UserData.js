import React from 'react'
import Notification from './Notification'
import Image from 'next/image'
import LogoutBtn from './LogoutBtn'
import { useSession } from 'next-auth/react'

const UserData = ({count}) => {
    const session = useSession()

    if (!session) return null
    return (
        <div className='cursor-pointer items-center lg:flex gap-2 h-full  relative  '>
            <Notification count={count} />
            {session?.data?.user?.avatar && <div className='w-7 h-7 relative'>
                <Image src={session?.data?.user?.avatar} alt='avatar' layout='fill' />
            </div>
            }
            <h6 className='font-semibold group hover:text-blue-400'>{session?.data?.user?.name}</h6>
            <LogoutBtn />
        </div>
    )
}

export default UserData