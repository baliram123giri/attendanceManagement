import React from 'react'
import { PiStudentFill } from 'react-icons/pi'

const SkewComp = ({ title }) => {
    return (
        <>
            <div style={{ transform: "skew(-35deg)" }} className='bg-slate-500/20 -top-10 left-14 h-[70px] justify-center items-center flex w-[200px] px-5 absolute'>
            </div>
            <div style={{ transform: "skew(-35deg)" }} className='bg-red-300 -top-8 left-10 h-[70px] justify-center items-center flex w-[200px] px-5 absolute'>
                <div style={{ transform: "skew(30deg)" }} className='font-semibold flex items-center'>
                    <PiStudentFill size={25} />  {title}
                </div>
            </div>
        </>
    )
}

export default SkewComp