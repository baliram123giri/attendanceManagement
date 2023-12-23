import React from 'react'
import Link from 'next/link'
import AppButton from '@/components/Buttons/AppButton'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import AssignmentList from './AssignmentList'

const MyAssignments = () => {
  return (
    <section className='bg-white p-2 '>
      <div className='flex gap-1 flex-wrap items-center bg-white p-2 text-sm shadow font-semibold '>
        <h6>My Assignments</h6> <Link href={"/assignments/myassignments/add"}>  <div className="flex items-center gap-1 border-main-app-secondary border p-1 text-main-app-secondary rounded-full"> <FaPlusCircle /></div></Link>
      </div>

      <AssignmentList />
    </section>
  )
}

export default MyAssignments