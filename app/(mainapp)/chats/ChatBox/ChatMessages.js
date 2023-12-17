import moment from 'moment';
import React from 'react'
import { BiCheckDouble } from "react-icons/bi";
const ChatMessages = ({ receiver = false, message, time, isSeen = false }) => {
    return (
        <div className={`chat_message ${receiver ? "" : "ms-auto"}`}>
            <div className={`${receiver ? "bg-white rounded-xl rounded-bl-none" : "bg-main-app-error  rounded-bl-md rounded-tr-md text-white"} mt-5  p-2 py-3   text-xs `}>
                {message}
            </div>
            <p className='text-[10px] my-2 flex items-center gap-1'>
                {moment(time).calendar()} {!receiver && <BiCheckDouble size={20} className={`${isSeen ? 'text-blue-500' : "text-gray-500"}`} />}
            </p>
        </div>

    )
}

export default ChatMessages