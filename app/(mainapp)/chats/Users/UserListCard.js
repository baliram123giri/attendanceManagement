import { AuthContext } from '@/Provider/contexApi/AuthContext'
import { ChatContex } from '@/Provider/contexApi/ChatContext'
import { useFecthRecipientUser } from '@/hooks/useFecthRecipient'
import Image from 'next/image'
import React, { useContext } from 'react'

const UserListCard = ({ imgSrc, isActive = false, notification = false, chat, user }) => {
    const { recipientUser } = useFecthRecipientUser(chat, user)
    const { onlineUsers } = useContext(ChatContex)

    return (
        <div className={`flex items-center gap-3 py-2 border-t cursor-pointer ${isActive ? "bg-blue-300/20 border-r-2 border-r-blue-300/50" : "bg-white"}  hover:bg-gray-100 hover:border-r-2 hover:border-r-main-app-error px-2`}>
            <div className='relative'>
                <Image style={{ borderRadius: "50%", height: 50, width: 50 }} src={imgSrc} alt='avatar' />
                {onlineUsers?.find(({ userId }) => userId === chat?.members[1]) && <span className='bg-main-app-error w-3 h-3 rounded-full inline-block absolute top-[5px] border-gray-200 right-0'></span>}
            </div>
            <div className='flex justify-between  flex-1'>
                <div>
                    <h6 className='font-semibold leading-none'>{recipientUser?.name} </h6>
                    <small className='text-[11px] leading-none'>{"Hello"}</small>

                </div>

                {notification && <div className='text-xs '>
                    <span className='leading-none'>{notification?.time}</span>
                    <h5 className='text-white mt-1 bg-red-600 w-5 h-5 rounded-full flex text-center justify-center items-center'>{notification?.count}</h5>
                </div>}
            </div>
        </div>
    )
}

export default UserListCard