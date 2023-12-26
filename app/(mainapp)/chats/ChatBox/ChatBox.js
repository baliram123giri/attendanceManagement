"use client"
import Image from 'next/image'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
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
import { GrAttachment } from "react-icons/gr";
import { IoClose } from 'react-icons/io5'
import { getFiletype } from '@/utils/utils'
import { toast } from 'react-toastify'
import ChatTools from './ChatTools'
const ChatBox = () => {
    const { currentChat, sendMessage, messages, onlineUsers, setMessages, sendMessageLoading } = useContext(ChatContex)
    const { user } = useContext(AuthContext)
    const [file, setFile] = useState(null)
    const [filePreview, setFilePreview] = useState(null)
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


    if (!currentChat) return null
    if (isLoading) return <div style={{ background: `url(${chatbg.src})`, backgroundSize: 300, backgroundColor: " rgba(255, 255, 255, 0.2)" }} className='flex justify-center items-center h-full'><RotateLoader /></div>
    const isOnline = onlineUsers?.find(({ userId }) => currentChat?.members?.includes(userId) && (userId !== user?._id))
    const sendMessaHandler = (text) => {
        if (text) {

            sendMessage(text, currentChat?._id, currentChat?.members?.filter((id) => id !== user?._id)[0], user?._id, setTextMessage, file, setFile)
        }
    }
    const fileHandler = (e) => {
        const file = e.target.files[0];

        if (file) {
            const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            const allowedPdfTypes = ['application/pdf'];
            const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

            if (
                (allowedImageTypes.includes(file.type) || allowedPdfTypes.includes(file.type)) &&
                file.size <= maxSizeInBytes
            ) {
                setFile(file);

                const reader = new FileReader();
                reader.onload = function (result) {
                    setFilePreview(result.target.result);
                };

                reader.readAsDataURL(file);
            } else {
                if (file.size > maxSizeInBytes) {
                    toast('File size exceeds the maximum limit of 2MB.', { type: "error" });
                } else {
                    toast('Invalid file type. Please select an image (JPEG, PNG, GIF) or a PDF.', { type: "error" });
                }

                e.target.value = null; // Reset the input field
                setFile(null);
                setFilePreview(null);
            }
        } else {
            setFile(null);
            setFilePreview(null);
        }
    };

    //data:image
    //data:application
    const isSendBtn = (textMessage || file)
    return (
        <div className='h-full'>
            <div className={`flex items-center gap-3  border-t cursor-pointer w-full bg-white  px-2`}>
                {recipientUser?.avatar ? <div className='relative w-[40px] p-1 h-[40px] border-2  rounded-full'><Image layout='fill' src={recipientUser?.avatar} alt='avatar' /> </div> : <FaUserCircle className='text-gray-400' size={40} />}
                <div className='flex justify-between items-center w-full '>
                    <div>
                        <h6 className='font-semibold leading-none'>{recipientUser?.name || "Unknown User"}</h6>
                        {isOnline ? <div className='flex items-center mt-1 gap-1'>
                            <div className="h-2 w-2 rounded-full bg-main-app-primary animate-pulse"></div>
                            <small className='text-[11px] leading-none'>Online</small>
                        </div> : <small className='text-[11px] leading-none'>Offline</small>}

                    </div>
                    <div className='group  relative py-2 min-w-[100px] flex justify-end '>
                        <div className='w-10 h-10 flex justify-center items-center  border border-gray-200 p-1 rounded-full  '>
                            <IoIosMore size={25} className='text-gray-400 cursor-pointer' />

                        </div>
                        <div className='bg-white right-[0px] -bottom-[100px] hidden group-hover:block z-10 w-[130px] absolute shadow-sm border rounded-sm'>
                            <ChatTools />
                        </div>
                    </div>

                </div>
            </div>
            <div className='h-[91%]   w-full relative ' style={{ background: `url(${chatbg.src})`, backgroundSize: 300, backgroundColor: " rgba(255, 255, 255, 0.2)" }}>

                {file && <div className='h-full bg-gray-100 w-full py-3  z-20 border-2 absolute top-0'>
                    <div className='flex items-center'>
                        <IoClose size={25} className='ms-2 mb-2 cursor-pointer' onClick={() => {
                            setFile(null)
                            setFilePreview(null)
                        }} />
                        <h4 className='text-center mx-auto m-0 mt-1  text-sm'>{file?.name}</h4>
                        <div className='absolute bottom-0 w-full left-0 bg-white flex items-center'>
                            <div className='w-10 ms-2 relative cursor-pointer'>
                                <div className='absolute cursor-pointer w-full h-full flex justify-center items-center'>
                                    <GrAttachment size={22} />
                                </div>
                                <input type="file" onChange={fileHandler} className='w-full opacity-0' />
                            </div>
                            <div className='flex-1'>
                                <InputEmoji onEnter={sendMessaHandler} value={textMessage} onChange={setTextMessage} cleanOnEnter />
                            </div>
                            {isSendBtn && <div onClick={sendMessageLoading ? false : () => sendMessage(textMessage, currentChat?._id, currentChat?.members?.filter((id) => id !== user?._id)[0], user?._id, setTextMessage, file, setFile)} className=' me-3 ps-1.5 cursor-pointer h-11  flex justify-center items-center text-main-app-error rounded-full'>
                                {sendMessageLoading ? <RotateLoader width={20} /> : <IoMdSend size={25} />}
                            </div>}
                        </div>
                    </div>
                    <div className='flex items-center justify-center bg-gray-200  h-[90%] '>
                        <div className={` ${getFiletype(filePreview) === "pdf" ? "w-full h-[400px]" : "w-[300px]  h-[300px]"} relative`}>
                            {getFiletype(filePreview) === "image" ? <Image objectFit='contain' layout='fill' src={filePreview} alt='preview' /> : getFiletype(filePreview) === "pdf" ? <iframe src={filePreview} frameborder="0" className='w-full h-full border-none m-0 p-0' /> : ""}
                        </div>
                    </div>

                </div>}
                <div className='p-5 h-[90%]  users_messages overflow-auto'>
                    {messages && messages?.map((message, index) => {
                        return <div key={index} ref={scrollRef} >
                            <ChatMessages  {...message} isSeen={message?.isRead} time={message?.createdAt} receiver={user?._id !== message?.senderId} docs={message?.docs} docsName={message?.docsName} message={message?.text} />
                        </div>
                    })}

                </div>
                {!file && <div className='absolute bottom-0 w-full left-0 bg-white flex items-center'>
                    <div className='w-10 ms-2 relative cursor-pointer'>
                        <div className='absolute cursor-pointer w-full h-full flex justify-center items-center'>
                            <GrAttachment size={22} />
                        </div>
                        <input type="file" onChange={fileHandler} className='w-full opacity-0' />
                    </div>
                    <div className='flex-1'>
                        <InputEmoji onEnter={sendMessaHandler} value={textMessage} onChange={setTextMessage} cleanOnEnter />
                    </div>
                    {isSendBtn && <div onClick={sendMessageLoading ? false : () => sendMessage(textMessage, currentChat?._id, currentChat?.members?.filter((id) => id !== user?._id)[0], user?._id, setTextMessage, file, setFile)} className=' me-3 ps-1.5 cursor-pointer h-11  flex justify-center items-center text-main-app-error rounded-full'>
                        {sendMessageLoading ? <RotateLoader width={20} /> : <IoMdSend size={25} />}
                    </div>}
                </div>}
            </div>
        </div>
    )
}

export default ChatBox