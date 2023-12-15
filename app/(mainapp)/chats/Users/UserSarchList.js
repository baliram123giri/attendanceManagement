"use client"
import { AuthContext } from '@/Provider/contexApi/AuthContext'
import { ChatContex } from '@/Provider/contexApi/ChatContext';
import React, { useContext } from 'react'
import { MdOutlineMessage } from "react-icons/md";
const UserSarchList = ({ setOpen }) => {
    const { usersList, user } = useContext(AuthContext)
    const { CreateChat, usersChat } = useContext(ChatContex)

    return (
        <section className='w-full'>
            <div className='bg-white py-4'>
                <table className='w-full text-xs '>
                    <thead className='bg-gray-100 shadow h-10'>
                        <tr>
                            <th className='w-20 text-start ps-4'>Sr</th>
                            <th className='text-start'>Name</th>
                            <th className='text-start'>Email</th>
                            <th className='text-start'>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usersList && usersList.map(({ _id, name, email, }, index) => {
                                const isChat = usersChat?.some(({ members }) => members?.includes(_id))
                                if (isChat) {
                                    return null
                                }
                                return <tr key={_id} className='py-3 h-10 border-b'>
                                    <td className='ps-4'>{index + 1}</td>
                                    <td><div className='flex items-center gap-1'>
                                        <div className={`w-7 h-7 ${index % 2 == 0 ? " bg-main-app-secondary" : "bg-green-600"} rounded-full text-white justify-center flex items-center`}>
                                            <h6>{name?.split(" ")[0]?.charAt(0)?.toUpperCase() + name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</h6>
                                        </div>
                                        <h6>{name}</h6>
                                    </div> </td>
                                    <td>{email}</td>
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