
import { ChatContex } from '@/Provider/contexApi/ChatContext'
import { useFecthRecipientUser } from '@/hooks/useFecthRecipient'
import { momentTime } from '@/utils/utils';
import Image from 'next/image'
import React, { useContext } from 'react'
import { FaUserCircle } from "react-icons/fa";
const UserListCard = ({ imgSrc, isActive = false, chat, user }) => {
    const { recipientUser } = useFecthRecipientUser(chat, user)
    const { onlineUsers, setNotifications, notifications } = useContext(ChatContex)
    //remove notification
    const notificationRemove = () => {
        setNotifications((prve) => prve?.filter(({ chatId }) => chatId !== chat?._id))
    }
    const userNotifications = notifications?.filter(({ chatId }) => chatId === chat?._id) || []
    const count = userNotifications?.length || 0

    return (
        <div onClick={notificationRemove} className={`flex items-center gap-3 py-2 border-t cursor-pointer ${isActive ? "bg-blue-300/20 border-r-2 border-r-blue-300/50" : "bg-white"}  hover:bg-gray-100 hover:border-r-2 hover:border-r-main-app-error px-2`}>
            <div className='relative'>
                {imgSrc ? <Image style={{ borderRadius: "50%", height: 50, width: 50 }} src={imgSrc} alt='avatar' /> : <FaUserCircle className='text-gray-400' size={40} />}
                {onlineUsers?.find(({ userId }) => chat?.members?.includes(userId) && (userId !== user?._id)) && <span className='bg-main-app-primary w-3 h-3 rounded-full inline-block absolute top-[5px] border-gray-200 right-0'></span>}
            </div>
            <div title={userNotifications[0]?.text?.length > 30 ? userNotifications[0]?.text : ""} className='flex justify-between  flex-1 '>
                <div>
                    <h6 className='font-semibold leading-none'>{recipientUser?.name} </h6>
                    {count > 0 && <small className='text-[11px] leading-none'>{`${userNotifications[0]?.text?.length > 30 ? `${userNotifications[0]?.text?.slice(0, 30)}...` : userNotifications[0]?.text}`} </small>}

                </div>

                {count > 0 && <div className='text-xs flex flex-col items-center'>
                    {/* <span className='leading-none'>{userNotifications?.length}</span> */}
                    <span className='text-[9px] font-bold'>{momentTime(userNotifications[0]?.createdAt)}</span>
                    <h5 className='text-white text-[10px] mt-1 bg-main-app-secondary w-5 h-5 rounded-full flex text-center justify-center items-center'>{userNotifications?.length}</h5>
                </div>}
            </div>
        </div>
    )
}

export default UserListCard