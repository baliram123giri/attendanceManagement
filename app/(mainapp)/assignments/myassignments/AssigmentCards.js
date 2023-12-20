"use client"
import React from 'react'
import { FaGithub } from "react-icons/fa";
import { BiLogoNetlify } from "react-icons/bi";
import assigmentImg from "@/public/assignment.jpg"
import Image from 'next/image';
import { MdOutlineDeleteOutline } from "react-icons/md";
import axios from 'axios';

const AssigmentCards = () => {
    const captureScreenshot = async () => {
        try {
            const response = await axios.post('https://api.browshot.com/api/v1/screenshot/create', {
                url: "https://flipkartlayoutbaliram.netlify.app/",
                key: "aryVUiIOq9pnp15OfobBHC4IY2wkR",
            });

            const screenshotId = response.data.screenshot_id;
            console.log(screenshotId)
            // Now you can use the screenshot_id to retrieve the screenshot image
            // Check Browshot documentation for details on fetching the image.
        } catch (error) {
            console.error('Error capturing screenshot:', error.message);
        }
    };
    captureScreenshot()
    return (
        <div className='bg-white  rounded-md border'>
            <Image className='opacity-75 rounded-t-md' src={assigmentImg} alt='assignments' />
            <div className='p-2'>
                <h6 className='text-sm font-semibold '>Runs the app in the development mode</h6>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-2 items-center my-3'>
                        <div className='flex items-center gap-1 cursor-pointer'>
                            <FaGithub size={22} className='text-red-400' />
                            <span>Github</span>
                        </div>
                        <div className='flex items-center gap-1 cursor-pointer'>
                            <BiLogoNetlify className='text-cyan-500 ' size={22} />
                            <span>Netlify</span>
                        </div>
                    </div>
                    <div className='w-8  h-8 cursor-pointer border bg-none rounded-full border-red-500 p-1 flex justify-center items-center'>
                        <MdOutlineDeleteOutline className='bg-none  border-0' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssigmentCards