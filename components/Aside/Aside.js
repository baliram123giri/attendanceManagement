"use client"
import { useDispatch, useSelector } from "react-redux"
import "./aside.css"
import React from 'react'
import { FaAngleLeft, FaAngleRight, FaUsers } from "react-icons/fa6"
import { ASIDEBAR_TOGGLE } from "@/redux/layoutReducer/layout.reducer"
import { MdAssessment } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MdCalendarMonth } from "react-icons/md";
import { MdAssignment } from "react-icons/md";
import { SiGooglemeet } from "react-icons/si";
import { useSession } from "next-auth/react"
import { IoChatbubblesOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import Image from "next/image"
import LogoutBtn from "../Header/LogoutBtn"
import { FaUserCircle } from "react-icons/fa"
import { GiSpikyField } from "react-icons/gi";
const Aside = ({ count, open, setOpen }) => {
    const dispatch = useDispatch()
    const { asideBarToggle } = useSelector(state => state.layoutReducer)
    const pathname = usePathname()
    const session = useSession()

    const isAdmin = session?.data?.user?.role === "admin"

    const Menu = [{
        key: "/",
        lable: "Dashboard",
        icon: <MdAssessment size={25} />
    },
    {
        key: "/classes",
        lable: "Classes",
        icon: <MdMenuBook size={25} />
    },
    {
        key: "/attendance",
        lable: "Attendance",
        icon: <MdCalendarMonth size={25} />
    },
    {
        key: "/assignments",
        lable: "Assignments",
        icon: <MdAssignment size={25} />
    },
    ...(isAdmin ? [{
        key: "/meeting",
        lable: "Meeting",
        icon: <SiGooglemeet size={25} />
    }, {
        key: "/students",
        lable: "Students",
        icon: <FaUsers size={25} />
    }] : []),
    {
        key: "/chats",
        lable: "Chats",
        ...((open && count) ? { icon: <div className="relative"><IoChatbubblesOutline size={25} /> <div className="w-6 h-6 flex justify-center items-center rounded-full absolute left-[80px] -top-[5px] bg-main-app-error"><span className="text-xs text-white">{count}</span></div> </div> } : { icon: <IoChatbubblesOutline size={25} /> }),
    },
    {
        key: "/settings",
        lable: "Settings",
        icon: <CiSettings size={25} />
    },
    {
        key: "/stream",
        lable: "Streams",
        icon: <GiSpikyField size={25} />
    },
    ]

    return (
        <aside className={` h-full asidebar    ${asideBarToggle ? "" : "collapsed"} bg-main-app-primary flex flex-col justify-between `}>
            <div>
                <div className="bg-white relative flex flex-col items-center py-2 lg:hidden">
                    {session?.data?.user?.avatar ? <div className='w-7 h-7 relative '>
                        <Image src={session?.data?.user?.avatar} alt='avatar' layout='fill' className="rounded-full" />
                    </div> : <div className='w-7 h-7 relative '>
                        <FaUserCircle className='text-gray-400' size={40} />
                    </div>
                    }
                    <h6 className='font-semibold group hover:text-blue-400 mt-2'>{session?.data?.user?.name}</h6>
                    <div onClick={() => setOpen(false)} className="absolute right-0 top-0 border rounded-md p-1 flex justify-center items-center">
                        <IoMdClose size={30} />
                    </div>
                </div>
                <div className="relative hidden lg:block">
                    <div
                        onClick={() => dispatch({ type: ASIDEBAR_TOGGLE })}
                        className="text-sm w-7 h-7 rounded-full cursor-pointer -right-2 top-0 absolute bg-main-app-secondary flex justify-center items-center text-white"
                    >
                        {!asideBarToggle ? (
                            <FaAngleLeft color="#fff" />
                        ) : (
                            <FaAngleRight color="#fff" />
                        )}
                    </div>
                </div>
                <ol className="pt-0 lg:pt-8">
                    {Menu.map(({ key, icon, lable }) => (
                        <li className="mb-2" key={key}><Link href={key} className={`flex ${(pathname === key) || (`/${pathname?.split("/")[1]}` === key) || (key === "/students" && pathname === "/userinfo") ? "bg-main-app-secondary" : ""} items-center gap-2 ${asideBarToggle ? "" : "lg:justify-center"} text-main-xl p-2 text-white`}>{icon}  <span className="lg:hidden">{lable}</span> {asideBarToggle && <span className="hidden lg:block">{lable}</span>}</Link></li>
                    ))}
                </ol>
            </div>
            <div className="lg:hidden">
                <LogoutBtn />
            </div>
        </aside>
    )
}

export default Aside