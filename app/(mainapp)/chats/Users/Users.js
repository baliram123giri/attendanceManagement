"use client"
import React, { useContext, useState } from 'react'
import { IoIosMore } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import UserListCard from './UserListCard';
import avatar from "@/public/avatar.jpg"
import Modal from '@/components/Modal/Modal';
import UserSarchList from './UserSarchList';
import { ChatContex } from '@/Provider/contexApi/ChatContext';
import { AuthContext } from '@/Provider/contexApi/AuthContext';

const Users = () => {
    const [open, setOpen] = useState(false)
    const { usersList, user } = useContext(AuthContext)
    const { usersChat, updateChat, currentChat } = useContext(ChatContex)
    return (
        <div>
            <Modal setOpen={setOpen} open={open} width={60} > <UserSarchList setOpen={setOpen} /></Modal>
            <div className='p-2'>
                <div className='flex justify-between flex-wrap items-center'>
                    <h4 className='text-sm font-bold'>Messages</h4>
                    <IoIosMore size={25} className='text-gray-400 cursor-pointer' />
                </div>
                {/* //serch box  */}
                <div className='flex gap-1.5 my-3 text-xs flex-wrap items-center border p-1 px-1.5 border-gray-200 rounded-full'>
                    <LuSearch className='text-gray-400' size={20} />
                    <input type="text" className='border-0 flex-1  p-1 focus:outline-none' placeholder='Search for chats' />
                </div>
                <div onClick={() => setOpen(true)} className='flex gap-1.5 cursor-pointer my-2 text-white text-[13px] flex-wrap items-center justify-center border p-2 px-1.5 bg-main-app-error rounded-full'>
                    <FaPlus size={16} />
                    <h5>Start New Chat</h5>
                </div>
            </div>

            <div className='my-2 mt-5 h-full overflow-auto users_messages' >
                {usersChat?.length > 0 && usersChat?.map((chat, index) => {
                    return <div onClick={() => { updateChat(chat) }} key={index}> <UserListCard isActive={JSON.stringify(currentChat) === JSON.stringify(chat)} chat={chat} user={user} imgSrc={avatar} message={"When will it be ready?"} username={"Baliram Giri"} /></div>
                })}
            </div>
        </div>
    )
}

export default Users