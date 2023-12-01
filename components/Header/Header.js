import Link from 'next/link';
import React from 'react'
import { PiStudent } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
const Header = () => {
    return (
        <header className='h-[10vh] flex items-center  border-b px-3  justify-between' >
            <Link href={"/"}><div className='flex items-center gap-2 border px-2 -skew-x-12'><PiStudent className='text-main-app-secondary' size={40} /> <span className=' font-bold text-main-app-primary'>STUDENTS PORTAL</span></div></Link>
            <div className='cursor-pointer hover:text-blue-400 relative '>
                <h6 className='font-semibold group'>Baliram Giri</h6>
                {/* <div className='bg-white  group-hover:visible  border p-2 shadow absolute top-11 -left-10'>
                    <Link href={"/login"} className="p-2 py-1 text-white flex items-center gap-2 text-main-xl border mb-1 bg-blue-400"> <IoLogOutOutline size={20} /> Logout</Link>
                </div> */}
            </div>
        </header>
    )
}

export default Header