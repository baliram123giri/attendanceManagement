import Link from 'next/link';
import React from 'react'
import { PiStudent } from "react-icons/pi";
const Header = () => {
    return (
        <header className='h-[10vh] flex items-center  border-b px-3  justify-between' >
            <Link href={"/"}><div className='flex items-center gap-2 border px-2 -skew-x-12'><PiStudent className='text-main-app-secondary' size={40} /> <span className=' font-bold text-main-app-primary'>STUDENTS PORTAL</span></div></Link>
            <div className='cursor-pointer hover:text-blue-400'>
                <h6 className='font-semibold'>Baliram Giri</h6>
            </div>
        </header>
    )
}

export default Header