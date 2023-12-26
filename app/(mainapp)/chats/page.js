import React from 'react'
import Users from './Users/Users'
import ChatBox from './ChatBox/ChatBox'
export const metadata = {
    title: "Chats",
    description: 'Generated by User',
}
const Chats = () => {
    return (
        <section className='flex lg:flex-row flex-col h-[85vh] '>
            <div className='flex-0 lg:w-[300px] max-h-[300px] lg:min-h-full  bg-white border-r-2'>
                <Users />
            </div>
            <div className='flex-1 bg-[#E7EBEF] min-h-[400px] lg:h-full'>
                <ChatBox />
            </div>
        </section>
    )
}

export default Chats