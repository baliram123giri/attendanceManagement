import Link from 'next/link';
import React from 'react'
import { PiStudent } from "react-icons/pi";
import dynamic from 'next/dynamic';
const ProfileData = dynamic(() => import("./ProfileData"), { ssr: false, loading:()=><>Loading...</> })
const Header = () => {
    return (
        <header className='h-[10vh] flex items-center  border-b px-3  justify-between' >
            <Link href={"/"}><div className='flex items-center gap-2 border px-2 -skew-x-12'><PiStudent className='text-main-app-secondary' size={40} /> <span className=' font-bold text-main-app-primary'>STUDENTS PORTAL</span></div></Link>
            <ProfileData />
        </header>
    )
}

export default Header