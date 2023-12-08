"use client"
import React, { useEffect, useRef, useState } from 'react'
import { BsCopy } from 'react-icons/bs'

import { baseURL, myAxios, statusHandler } from '@/utils/utils'
import DeleteAttendance from './DeleteAttendance'
import useClipboard from "react-use-clipboard";
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useMutation } from '@tanstack/react-query';
import RotateLoader from '@/components/LoadingSpinner/RotateLoader';
const io = require("socket.io-client")
const JoinedList = () => {
    const [attendance, setAttendance] = useState([]);
    const [meetLink, setMeetLink] = useState(null)
    const [isCopied, setCopied] = useClipboard(meetLink?.link, {
        // `isCopied` will go back to `false` after 1000ms.
        successDuration: 1000,
    });

    //socketRef red 
    const socketRef = useRef(null)

    const { mutate, isLoading } = useMutation(async () => {
        const { data } = await myAxios.delete(`/meeting/delete/${meetLink?._id}`)
        return data
    },
        {
            ...statusHandler(), onSettled() {
                socketRef.current.emit("allAttendance", null)
                socketRef.current.emit("meeting", null)

            }
        }
    )

    const deleteMeetingHandler = () => {
        mutate()
    }

    useEffect(() => {
        // Connect to the SocketRef.io server
        socketRef.current = io(baseURL); // replace with your server URL
        socketRef.current.emit("allAttendance", null)
        socketRef.current.emit("meeting", null)
        // Listen for the 'allAttendance' event
        socketRef.current.on('allAttendance', (data) => {
            setAttendance(data);
            //   console.log(data)
        });
        socketRef.current.on("meeting", (data) => {
            setMeetLink(data[0])
        })
        return () => socketRef.current.disconnect()
        // Clean up the socketRef connection on component unmount
    }, []); // Empty dependency array ensures this effect runs once when the component mounts

    return (
        <>
            {meetLink && <div className='bg-white p-4'>
                <h6 className='font-semibold'>Google Meet Link</h6>
                <div className='flex  flex-wrap gap-3 items-center'>
                    <small>{meetLink?.link}</small>
                    <button onClick={setCopied}>
                        {isCopied ? "Copied! 👍" : <BsCopy className='cursor-pointer hover:text-blue-500' />}
                    </button>

                    {isLoading ? <RotateLoader width={25} /> : <MdOutlineDeleteOutline onClick={deleteMeetingHandler} cursor={"pointer"} className='text-red-600' size={20} />}

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
                            attendance && attendance?.map(({ _id, name, course, time }, index) => {

                                return <tr key={_id} className='py-3 h-10 border-b'>
                                    <td className='ps-4'>{index + 1}</td>
                                    <td><div className='flex items-center gap-1'>
                                        <div className='w-7 h-7 bg-main-app-secondary rounded-full text-white justify-center flex items-center'>
                                            <h6>{name?.split(" ")[0]?.charAt(0)?.toUpperCase() + name?.split(" ")[1]?.charAt(0)?.toUpperCase()}</h6>
                                        </div>
                                        <h6>{name}</h6>
                                    </div> </td>
                                    <td>{course}</td>
                                    <td>{time}</td>
                                    <td><DeleteAttendance id={_id} /></td>
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