import React from 'react'
import { studentList } from './services'
import DeleteUser from './DeleteUser'

import UserAvtar from './UserAvtar'

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
                                    <td>
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