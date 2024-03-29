"use client"
import React, { useEffect, useRef, useState } from 'react'
import { BsCopy } from 'react-icons/bs'

import { baseURL, myAxios, statusHandler } from '@/utils/utils'
import DeleteAttendance from './DeleteAttendance'
import useClipboard from "react-use-clipboard";
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useMutation } from '@tanstack/react-query';
import RotateLoader from '@/components/LoadingSpinner/RotateLoader';
import UserAvtar from '../../students/UserAvtar'
import { useSession } from 'next-auth/react'
const io = require("socket.io-client")
const JoinedList = () => {
    const session = useSession()
    const [MeetingLink, setMeetingLink] = useState([]);
    const [joinedListData, setJoinedListData] = useState([]);

    const [isCopied, setCopied] = useClipboard(MeetingLink?.link, {
        // `isCopied` will go back to `false` after 1000ms.
        successDuration: 1000,
    });

    //socketRef red 
    const socketRef = useRef(null)

    //fecth joined api
    const { mutate: matateMeetingJoinedList, isLoading: isLoadingMeetingJoinedList } = useMutation(async () => {
        const { data } = await myAxios.get(`/meeting/joined/list`)
        return data
    }, {
        onSuccess(data) {
            setJoinedListData(data || [])
        }
    })


    const { mutate, isLoading } = useMutation(async () => {
        const { data } = await myAxios.delete(`/meeting/delete/${MeetingLink?._id}`)
        return data
    },
        {
            ...statusHandler(), onSettled() {
                matateMeetingJoinedList()
            }
        }
    )


    const { mutate: matateMeeting, isLoading: isLoadingMeeting } = useMutation(async () => {
        const { data } = await myAxios.get(`/meeting/list`)
        return data
    }, {
        onSuccess(data) {
            setMeetingLink(data)
        }
    })

    const deleteMeetingHandler = () => {
        mutate()
    }

    useEffect(() => {
        // Connect to the SocketRef.io server
        socketRef.current = io(baseURL); // replace with your server URL
        // Listen for the 'allAttendance' event
        socketRef.current.on('allAttendance', (data) => {
            matateMeetingJoinedList()
        });

        socketRef.current.on('meeting', (data) => {
            console.log(data)
            if (data.userId !== session?.data?.user?._id) return
            setMeetingLink(data)
        });

        socketRef.current.on("deleteMeeting", () => {
            matateMeeting()
        })

        return () => {
            socketRef.current.off("meeting")
            socketRef.current.off("deleteMeeting")
            socketRef.current.off("allAttendance")
        }
        // Clean up the socketRef connection on component unmount
    }, [MeetingLink?._id, socketRef, session]); // Empty dependency array ensures this effect runs once when the component mounts

    useEffect(() => {
        matateMeetingJoinedList()
        matateMeeting()
    }, [matateMeeting, matateMeetingJoinedList])

    return (
        <>
            {MeetingLink && <div className='bg-white p-4'>
                <h6 className='font-semibold'>Google Meet Link</h6>
                <div className='flex  flex-wrap gap-3 items-center'>
                    <small>{isLoadingMeeting ? "Loading..." : MeetingLink?.link}</small>
                    <button onClick={setCopied}>
                        {isCopied ? "Copied! 👍" : <BsCopy className='cursor-pointer hover:text-blue-500' />}
                    </button>

                    {isLoading || isLoadingMeetingJoinedList ? <RotateLoader width={25} /> : <MdOutlineDeleteOutline onClick={deleteMeetingHandler} cursor={"pointer"} className='text-red-600' size={20} />}

                </div>
            </div>}

            <div className='bg-white py-4'>
                <table className='w-full text-xs '>
                    <thead className='bg-gray-100 shadow h-10'>
                        <tr>
                            <th className='w-20 text-start ps-4'>Sr</th>
                            <th className='text-start'>Name</th>
                            <th className='text-start'>Course</th>
                            <th className='text-start'>Time</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            joinedListData && joinedListData?.map(({ _id, name, avatar, time }, index) => {

                                return <tr key={_id} className='py-3 h-10 border-b'>
                                    <td className='ps-4'>{index + 1}</td>
                                    <td><div className='flex items-center gap-1'>
                                        <div className='w-7 h-7 bg-main-app-secondary rounded-full text-white justify-center flex items-center'>
                                            <UserAvtar avatar={avatar} name={name} />
                                        </div>
                                        <h6>{name}</h6>
                                    </div> </td>
                                    <td>{MeetingLink?.course?.name}</td>
                                    <td>{time}</td>
                                    <td><DeleteAttendance id={_id} courseId={MeetingLink?.course?._id} /></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>

    )
}

export default JoinedList