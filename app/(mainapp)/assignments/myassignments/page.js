import React from 'react'
import AssignmentList from './AssignmentList'
import AddBtn from '@/components/Buttons/AddBtn'

const MyAssignments = () => {
  return (
    <section className='bg-white p-2 '>
      <AddBtn title={"My Assignments"} path={"/assignments/myassignments/add"} />
      <AssignmentList />
    </section>
  )
}

export default MyAssignments