"use client"
import { AuthContext } from '@/Provider/contexApi/AuthContext'
import { ChatContex } from '@/Provider/contexApi/ChatContext';

import React, { useContext } from 'react'
import { MdOutlineMessage } from "react-icons/md";
import UserAvtar from '../../students/UserAvtar';
const UserSarchList = ({ setOpen }) => {
    const { usersList, user } = useContext(AuthContext)
    const { CreateChat, usersChat } = useContext(ChatContex)

    return (
        <section className='w-full overflow-auto'>
            <div className='bg-white py-4'>
                <table className='w-full text-xs '>
                    <thead className='bg-gray-100 shadow h-10'>
                        <tr>
                            <th className='text-start'>Name</th>
                            <th className='text-start'>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usersList && usersList.map(({ _id, name, avatar }, index) => {
                                const isChat = usersChat?.some(({ members }) => members?.includes(_id))
                                if (isChat || (user?._id === _id)) {
                                    return null
                                }
                                return <tr key={_id} className='py-3 h-10 border-b'>
                                    <td><div className='flex items-center gap-1'>

                                        <div className={`w-7 h-7 ${index % 2 == 0 ? " bg-main-app-secondary" : "bg-green-600"} rounded-full text-white justify-center flex items-center`}>
                                            <UserAvtar avatar={avatar} name={name} />
                                        </div>
                                        <h6>{name}</h6>
                                    </div> </td>
                                    <td><MdOutlineMessage onClick={() => {
                                        CreateChat({ firstId: user?._id, secondId: _id })
                                        setOpen(false)
                                    }} className='text-main-app-primary cursor-pointer' size={20} /></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default UserSarchList