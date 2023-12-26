import React, { useContext } from 'react'
import { GrClear } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { FaFacebookMessenger } from "react-icons/fa6";
import { useMutation } from '@tanstack/react-query';
import { myAxios, statusHandler } from '@/utils/utils';
import { ChatContex } from '@/Provider/contexApi/ChatContext';
import RotateLoader from '@/components/LoadingSpinner/RotateLoader';
import { toast } from 'react-toastify';
const ChatTools = () => {
  const { currentChat, setMessages } = useContext(ChatContex)
  const { isLoading: isLoadingClearChat, mutate: mutateClearChat } = useMutation(async (clear) => {
    const { data } = await myAxios.delete(`/chats/clear/${currentChat?._id}${clear ? `?clear=true` : ""}`)
    return data
  }, {
    ...statusHandler(), onSuccess({ message }) {
      toast(message, { type: "success" })
      setMessages([])
    }
  })

  //function


  return (
    <ul className='text-xs'>
      <li onClick={() => mutateClearChat(true)} className='p-2 border-b hover:bg-main-app-secondary/70 hover:text-white '>{isLoadingClearChat ? <RotateLoader width={20} /> : <div className='flex gap-1 items-center'><FaFacebookMessenger className='text-red-400' /><span>Clear Chat</span></div>}</li>
      <li className='p-2 border-b hover:bg-main-app-secondary/70 hover:text-white flex gap-1 items-center'><GrClear className='text-red-400' /><span>Block</span></li>
      <li onClick={() => mutateClearChat(false)} className='p-2  hover:bg-main-app-secondary/70 hover:text-white'> {isLoadingClearChat ? <RotateLoader width={20} /> : <div className='flex gap-1 items-center'><AiOutlineDelete className='text-red-400' /><span>Delete User</span></div>} </li>
    </ul>
  )
}

export default ChatTools