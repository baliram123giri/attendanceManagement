import { momentTime } from '@/utils/utils';
import Image from 'next/image';
import React from 'react'

import { BiCheckDouble } from "react-icons/bi";
import { FaDeleteLeft } from 'react-icons/fa6';


const ChatMessages = ({ receiver = false, message, time, docs, isSeen = false, onDelete }) => {
    const isPdf = docs ? docs?.split(".")[3] : false
    console.log(isPdf)
    return (
        <div className={`chat_message ${receiver ? "" : "ms-auto"}`}>
            <div className={`${receiver ? "bg-white rounded-xl rounded-bl-none" : "bg-main-app-error   rounded-bl-md rounded-tr-md text-white"} mt-5  p-2 py-3   text-xs relative group`}>
                {docs && isPdf === "png" && <div style={{ width: '100%', height: '180px', position: 'relative' }}>
                    <Image layout='fill'
                        objectFit='cover' className='object-cover rounded-t-md border-b' src={docs} alt={`docs_${docs}`} />
                </div>}
                {docs && isPdf === "pdf" && <div style={{ width: '100%', height: '180px', position: 'relative' }}>
                    <iframe src={docs} frameborder="0"></iframe>
                </div>}

                {message}
                {!receiver && <div onClick={onDelete} className='absolute text-red-600 top-0 -right-[10px] cursor-pointer hidden group-hover:block'>
                    <FaDeleteLeft size={18} />
                </div>}
            </div>
            <p className='text-[10px] my-2 flex items-center gap-1'>
                {momentTime(time)} {!receiver && <BiCheckDouble size={20} className={`${isSeen ? 'text-blue-500' : "text-gray-500"}`} />}
            </p>
        </div>

    )
}

export default ChatMessages