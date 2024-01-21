import React from 'react'
import { studentList } from './services'
import DeleteUser from './DeleteUser'
import { FaEye } from "react-icons/fa";
import UserAvtar from './UserAvtar'
import Link from 'next/link';
export const metadata = {
    title: 'Users',
    description: 'Generated by create next app',
}
const Students = async () => {
    const studentsData = await studentList() || []
    return (
        <section>
            <div className='bg-white py-4'>
                <table className='w-full text-xs '>
                    <thead className='bg-gray-100 shadow h-10'>
                        <tr>
                            <th className='w-20 text-start ps-4'>Sr</th>
                            <th className='w-56 text-start'>ID</th>
                            <th className='text-start'>Name</th>
                            <th className='text-start'>Email</th>
                            <th className='text-start'>Mobile</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            studentsData && studentsData.map(({ _id, name, email, mobile, avatar }, index) => {

                                return <tr key={_id} className='py-3 h-10 border-b'>
                                    <td className='ps-4'>{index + 1}</td>
                                    <td >{_id}</td>
                                    <td><div className='flex items-center gap-1'>
                                        <div className={`w-7 h-7 ${index % 2 == 0 ? "bg-main-app-primary" : "bg-main-app-secondary"} rounded-full text-white justify-center flex items-center relative`}>
                                            <UserAvtar avatar={avatar} name={name} />
                                        </div>
                                        <h6>{name}</h6>
                                    </div> </td>
                                    <td>{email}</td>
                                    <td>{mobile}</td>
                                    <td className='flex gap-1 justify-center items-center pt-1.5'>
                                        <Link href={{ pathname: `/userinfo`, search: `userid=${_id}` }}>  <div className='text-center text-main-app-primary hover:opacity-60 flex justify-center border w-7 h-7 items-center rounded-md cursor-pointer  '><FaEye /></div></Link>
                                        <DeleteUser userid={_id} />
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Students