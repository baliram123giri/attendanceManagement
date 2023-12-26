import { downloadImage, momentTime, myAxios, statusHandler } from '@/utils/utils';
import Image from 'next/image';
import React, { useState } from 'react'

import { BiCheckDouble } from "react-icons/bi";
import { FaDeleteLeft } from 'react-icons/fa6';
import { LiaDownloadSolid } from "react-icons/lia";
import pdfIcon from "@/public/pdf.png"
import { BiImage } from "react-icons/bi";
import NoPreview from '@/components/Preview/NoPreview';
import RotateLoader from '@/components/LoadingSpinner/RotateLoader';
import { useMutation } from '@tanstack/react-query';
const ChatMessages = ({ receiver = false, message, _id, time, docs, docsName, isSeen = false }) => {
    const isPdf = docs ? docs?.split(".")[3] : false
    const [isDownloading, setIsDownloading] = useState(false)
    const downloadHandler = (ele) => {
        setIsDownloading(true)
        downloadImage(docs, docsName).then(() => setIsDownloading(false))
    }
    const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(async () => {
        const { data } = await myAxios.delete(`/messages/delete/${_id}`)
        return data
    }, {
        ...statusHandler(), onSuccess() {
        }
    })


    return (
        <div className={`chat_message ${receiver ? "" : "ms-auto"}`}>
            <div className={`${receiver ? "bg-white rounded-xl rounded-bl-none" : "bg-main-app-error   rounded-bl-md rounded-tr-md text-white"} mt-5    text-xs relative group`}>
                {docs && isPdf !== "pdf" && <div style={{ minWidth: '300px', height: '180px', position: 'relative' }}>
                    <Image layout='fill'
                        objectFit='cover' className='object-cover rounded-t-md border-main-app-error border-2' src={docs} alt={`docs_${docs}`} />
                </div>}
                {docs && isPdf === "pdf" && <div style={{ minWidth: 300, height: '180px', position: 'relative' }} className=' border-main-app-error border-2'>
                    <NoPreview />
                </div>}
                {docsName && <div className='flex items-center justify-between p-2 bg-green-300/20'>
                    <div className='flex items-center gap-2 p-2'>
                        {isPdf !== "pdf" ? <BiImage size={30} /> : <Image width={30} quality={100} src={pdfIcon} alt='pdficons' />}

                        <span>{docsName}</span>
                    </div>
                    <div onClick={downloadHandler} className='w-6 h-6 border flex items-center justify-center rounded-full cursor-pointer'>
                        {isDownloading ? <RotateLoader width={15} /> : <LiaDownloadSolid size={18} />}
                    </div>
                </div>}
                {message && <p className='p-2'>
                    {message}
                </p>}

                {!receiver && <div onClick={mutateDelete} className='absolute text-red-600 top-0 -right-[10px] cursor-pointer hidden group-hover:block'>
                    {isLoadingDelete ? <RotateLoader width={15} /> : <FaDeleteLeft size={18} />}
                </div>}
            </div>
            <p className='text-[10px] my-2 flex items-center gap-1'>
                {momentTime(time)} {!receiver && <BiCheckDouble size={20} className={`${isSeen ? 'text-blue-500' : "text-gray-500"}`} />}
            </p>
        </div>

    )
}

export default ChatMessages