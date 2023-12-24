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
const Aside = () => {
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
        icon: <IoChatbubblesOutline size={25} />
    },
    {
        key: "/settings",
        lable: "Settings",
        icon: <CiSettings  size={25} />
    },
    ]

    return (
        <aside className={` h-full asidebar ${asideBarToggle ? "" : "collapsed"} bg-main-app-primary flex flex-col justify-between`}>
            <div>
                <div className="relative">
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
                <ol className="pt-8">
                    {Menu.map(({ key, icon, lable }) => (
                        <li className="mb-2" key={key}><Link href={key} className={`flex ${(pathname === key) || (`/${pathname?.split("/")[1]}` === key) ? "bg-main-app-secondary" : ""} items-center gap-2 ${asideBarToggle ? "" : "justify-center"} text-main-xl p-2 text-white`}>{icon} {asideBarToggle && <span>{lable}</span>}</Link></li>
                    ))}
                </ol>
            </div>
        </aside>
    )
}

export default Aside