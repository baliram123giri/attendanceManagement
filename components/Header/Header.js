import Link from 'next/link';
import React from 'react'
import logo from "@/public/logo_horizontal.png"
import dynamic from 'next/dynamic';
import Image from 'next/image';

const ProfileData = dynamic(() => import("./ProfileData"), { ssr: false, loading: () => <>Loading...</> })
const InActiveWarning = dynamic(() => import("./InActiveWarning"), { ssr: false, loading: () => null })
const Header = () => {

    return (
        <header className='h-[65px] flex items-center  border-b px-3  justify-between' >
            <Link href={"/"}><div>
                <Image src={logo} width={200} alt='bgtechhub.com' />
            </div></Link>
            <div className='flex-1'>
                <InActiveWarning />

            </div>
            <ProfileData />
        </header>
    )
}

export default Header