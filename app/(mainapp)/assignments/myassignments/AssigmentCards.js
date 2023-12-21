
import React, { useEffect } from 'react'
import { FaGithub } from "react-icons/fa";
import { BiLogoNetlify } from "react-icons/bi";
import Image from 'next/image';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { momentTime, myAxios, statusHandler } from '@/utils/utils';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import RotateLoader from '@/components/LoadingSpinner/RotateLoader';

const AssigmentCards = ({ title, _id, netlifyUrl, gitUrl, createdAt, thumbnail, mutate }) => {

    //delete assignment
    const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(async (id) => {
        const { data } = await myAxios.delete(`/assignment/delete/${id}`);
        return data
    }, { ...statusHandler(), onSettled() { mutate() } })

    return <div className='bg-white shadow rounded-md border w-full lg:w-[22%] my-2 '>
        <div style={{ width: '100%', height: '180px', position: 'relative' }}>
            <Image layout='fill'
                objectFit='cover' className='object-cover rounded-t-md border-b' src={thumbnail} alt='assignments' />
        </div>

        <div className='p-2'>
            <h6 className='text-sm font-semibold '>{title}</h6>
            <span className='text-xs'>Uploaded {momentTime(createdAt)}</span>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center my-3'>
                    <Link target='_blank' href={gitUrl} className='flex items-center gap-1 cursor-pointer'>
                        <FaGithub size={22} className='text-red-400' />
                        <span>Github</span>
                    </Link>
                    <Link target='_blank' href={netlifyUrl} className='flex items-center gap-1 cursor-pointer'>
                        <BiLogoNetlify className='text-cyan-500 ' size={22} />
                        <span>Netlify</span>
                    </Link>
                </div>
                <div onClick={isLoadingDelete ? false : () => mutateDelete(_id)} className='w-8  h-8 cursor-pointer border bg-none rounded-full border-red-500 p-1 flex justify-center items-center'>
                    {isLoadingDelete ? <RotateLoader width={20} /> : <MdOutlineDeleteOutline className='bg-none  border-0' />}
                </div>
            </div>
            
        </div>
    </div >
}

export default AssigmentCards