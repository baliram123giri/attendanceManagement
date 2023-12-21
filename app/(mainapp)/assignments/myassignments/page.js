import React from 'react'
import Link from 'next/link'
import AppButton from '@/components/Buttons/AppButton'
import { FaPlus, FaPlusCircle } from 'react-icons/fa'
import AssignmentList from './AssignmentList'

const MyAssignments = () => {
  return (
    <section className='bg-white p-2'>
      <div className='text-end'>
        <Link href={"/assignments/myassignments/add"}> <AppButton> <div className="flex items-center gap-1"> ADD <FaPlusCircle /></div></AppButton></Link>
      </div>
      <AssignmentList />
    </section>
  )
}

export default MyAssignments