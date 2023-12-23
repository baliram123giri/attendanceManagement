"use client"
import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import avatar3 from "@/public/avatar3.jpg"
import chatbg from "@/public/chatbg.jpg"
import { IoIosMore } from 'react-icons/io'
import InputEmoji from 'react-input-emoji'
import { IoMdSend } from "react-icons/io";
import ChatMessages from './ChatMessages'
import "./chats.css"
import { ChatContex } from '@/Provider/contexApi/ChatContext'
import { useFecthRecipientUser } from '@/hooks/useFecthRecipient'
import { AuthContext } from '@/Provider/contexApi/AuthContext'

import RotateLoader from '@/components/LoadingSpinner/RotateLoader'
import { FaUserCircle } from 'react-icons/fa'

const ChatBox = () => {
    const { currentChat, sendMessage, messages, onlineUsers, setMessages } = useContext(ChatContex)
    const { user } = useContext(AuthContext)
    const [file, setFile] = useState(null)
    const { isLoading, recipientUser } = useFecthRecipientUser(currentChat, user)
    const [textMessage, setTextMessage] = useState("")
    const scrollRef = useRef(null)

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })

    }, [messages])


    //function
    const deleteHandler = (message) => {
        setMessages(messages?.filter(({ _id }) => message?._id !== _id))
    }

    console.log(file)
    if (!currentChat) return null
    if (isLoading) return <div style={{ background: `url(${chatbg.src})`, backgroundSize: 300, backgroundColor: " rgba(255, 255, 255, 0.2)" }} className='flex justify-center items-center h-full'><RotateLoader /></div>
    const isOnline = onlineUsers?.find(({ userId }) => userId === currentChat?.members[1])

    return (
        <div className='h-full'>
            <div className={`flex items-center gap-3 py-2 border-t cursor-pointer w-full bg-white  px-2`}>
                {<FaUserCircle className='text-gray-400 mb-1' size={40} />}
                {/* <Image className='shadow' style={{ borderRadius: "50%", height: 50, width: 50 }} src={avatar3} alt='avatar' /> */}
                <div className='flex justify-between w-full'>
                    <div>
                        <h6 className='font-semibold leading-none'>{recipientUser?.name}</h6>
                        {isOnline ? <div className='flex items-center mt-1 gap-1'>
                            <div className="h-2 w-2 rounded-full bg-main-app-primary animate-pulse"></div>
                            <small className='text-[11px] leading-none'>Online</small>
                        </div> : <small className='text-[11px] leading-none'>Offline</small>}

                    </div>
                    <div className='w-10 h-10 flex justify-center items-center border border-gray-200 p-1 rounded-full '>
                        <IoIosMore size={25} className='text-gray-400 cursor-pointer' />
                    </div>
                </div>
            </div>
            <div className='h-[91%]  w-full relative ' style={{ background: `url(${chatbg.src})`, backgroundSize: 300, backgroundColor: " rgba(255, 255, 255, 0.2)" }}>
                <div className='p-5 h-[90%] overflow-auto'>
                    {messages && messages?.map((message, index) => {
                        return <div key={index} ref={scrollRef} >
                            <ChatMessages onDelete={() => deleteHandler(message)} isSeen={message?.isRead} time={message?.createdAt} receiver={user?._id !== message?.senderId} docs={message?.docs} message={message?.text} />
                        </div>
                    })}

                </div>
                <div className='absolute bottom-0 w-full left-0 bg-white flex items-center'>
                    <div className=''>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <div className='flex-1'>
                        <InputEmoji value={textMessage} onChange={setTextMessage} cleanOnEnter />
                    </div>
                    <div onClick={() => sendMessage(textMessage, currentChat?._id, currentChat?.members?.filter((id) => id !== user?._id)[0], user?._id, setTextMessage, file, setFile)} className=' me-3 ps-1.5 cursor-pointer h-11  flex justify-center items-center text-main-app-error rounded-full'>
                        <IoMdSend size={25} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBox