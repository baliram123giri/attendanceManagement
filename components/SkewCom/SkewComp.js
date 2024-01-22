import React from 'react'

import logo from "@/public/logo_verticle.png"
import Image from 'next/image'
const SkewComp = ({ title }) => {
    return (
        <>
            <div style={{ transform: "skew(-35deg)" }} className='bg-slate-500/20 -top-10 left-14 h-[70px] justify-center items-center flex w-[200px] px-5 absolute'>
            </div>
            <div style={{ transform: "skew(-35deg)" }} className='bg-white -top-8 left-10 h-[70px] justify-center items-center flex w-[200px] px-5 absolute'>
                <div style={{ transform: "skew(30deg)" }} className='font-semibold flex items-center'>
                    <Image src={logo} width={80} alt='bgtechhub.com' />
                </div>
            </div>
        </>
    )
}

export default SkewComp