import { ChatContex } from '@/Provider/contexApi/ChatContext'
import React, { useContext } from 'react'
import { IoIosNotifications } from 'react-icons/io'
import { GoBell } from "react-icons/go";
import { usePathname, useRouter } from 'next/navigation';
import moment from 'moment';
import { momentTime } from '@/utils/utils';
const Notification = () => {
    const { replace } = useRouter()
    const pathname = usePathname()
    const { notifications, updateChat, setNotifications } = useContext(ChatContex)
    const unreadNotifications = notifications?.filter(({ isRead }) => isRead === false) || []
    const count = pathname === "/chats" ? 0 : unreadNotifications?.length
    const updatedChat = (ele) => {
        setNotifications((prve) => prve?.filter(({ chatId }) => chatId !== ele?.chatId))
        updateChat({ ...ele, _id: ele?.chatId, members: [ele?.receiverId, ele?.senderId?._id] })
        //redirect chats page
        replace("/chats")
    }

    return (
        <div className='h-full '>
            <div className='relative group  h-full flex justify-center items-center'>
                {count > 0 && <div className='absolute top-[10px] -right-[5px]  bg-main-app-secondary w-4 h-4 rounded-full flex text-[8px] justify-center items-center text-white'>
                    {count}
                </div>}
                <IoIosNotifications size={25} />
                <div className={`${count ? "" : "hidden"} hidden group-hover:block absolute top-[40px] z-10 border min-w-[300px] -left-[150px] bg-white shadow-sm `}>
                    <div className='flex gap-1 p-3 px-5 items-center  border-b pb-2'>
                        <GoBell size={13} />
                        <h6 className='text-xs font-bold'>Notifications({count})</h6>
                    </div>
                    <ul className='max-h-[200px]  overflow-auto users_messages'>
                        {
                            unreadNotifications?.map((ele, index) => {
                                return <li onClick={() => updatedChat(ele)} key={index} className=' text-xs p-3  border-b py-2 flex gap-3 items-start hover:bg-main-app-secondary hover:text-white'>
                                    <div className='w-[40px] h-[40px] flex rounded-full text-gray-400 justify-center items-center bg-gray-100'>
                                        <IoIosNotifications size={20} />
                                    </div>
                                    <div className=' flex-1'>
                                        <p className='font-semibold pe-1 flex justify-between items-center '>{ele?.senderId?.name}  <span className='text-[9px] font-bold'>{momentTime(ele?.createdAt)}</span></p>

                                        <p className='text-[10px]'>{ele?.text}</p>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Notification