import React from 'react'
import Form from './SubmitForm/Form'
import AssigmentCards from './AssigmentCards'

const MyAssignments = () => {
  return (
    <section className='bg-white p-2'>
      <Form />
      <div className='flex items-center justify-between flex-wrap'>
        <div className='w-full lg:w-[24.5%] my-2'>
          <AssigmentCards />
        </div>
        <div className='w-full lg:w-[24.5%] my-2'>
          <AssigmentCards />
        </div>
        <div className='w-full lg:w-[24.5%] my-2'>
          <AssigmentCards />
        </div>
        <div className='w-full lg:w-[24.5%] my-2'>
          <AssigmentCards />
        </div>
      </div>
    </section>
  )
}

export default MyAssignments