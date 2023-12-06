"use client"
import React, { useEffect, useState } from 'react'
import { joinedList } from '../services'
import { useQuery } from '@tanstack/react-query'
import { BsCopy } from 'react-icons/bs'
import io from 'socket.io-client';
const JoinedList = () => {
    const [attendance, setAttendance] = useState([]);
    // const { data, isLoading } = useQuery({ queryFn: async () => await joinedList(), queryKey: ["joined list"] })
    const isDevlopment = process.env.NODE_ENV === "development"
    useEffect(() => {
        // Connect to the Socket.io server
        const socket = io(isDevlopment ? 'http://localhost:8000' : "https://api.bgtechub.com"); // replace with your server URL
        socket.emit("allAttendance", null)
        // Listen for the 'allAttendance' event
        socket.on('allAttendance', (data) => {
            setAttendance(data);
            //   console.log(data)
        });

        return () => socket.disconnect()
        // Clean up the socket connection on component unmount
    }, [isDevlopment]); // Empty dependency array ensures this effect runs once when the component mounts


    return (
        <>
            <div className='bg-white p-4'>
                <h6 className='font-semibold'>Google Meet Link</h6>
                <div className='flex  flex-wrap gap-3 items-center'>
                    <small>https://meet.google.com/dny-ddff-mqj</small>
                    <BsCopy className='cursor-pointer hover:text-blue-500' />
                </div>
            </div>
            <div className='bg-white py-4'>
                <table className='w-full text-xs '>
                    <thead className='bg-gray-100 shadow h-10'>
                        <tr>
                            <th className='w-20 text-start ps-4'>Sr</th>
                            <th className='text-start'>Name</th>
                            <th className='text-start'>Course</th>
                            <th className='text-start'>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            attendance && attendance.map(({ _id, name, course, time }, index) => {

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