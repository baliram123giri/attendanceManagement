"use client"
import AppButton from '@/components/Buttons/AppButton'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import MyLabel from '@/components/Texts/MyLabel'
import { myAxios, statusHandler } from '@/utils/utils'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'

const UserInfo = () => {
    const { get } = useSearchParams()
    const userID = useMemo(() => get("userid"), [get])
    const { data, mutate, isLoading } = useMutation(async () => {
        const { data } = await myAxios.get(`/users/about/${userID}`)
        return data
    }, { ...statusHandler() })

    useEffect(() => {
        if (userID) {
            mutate()
        }
    }, [userID, mutate])

    // const data = {
    //     "_id": "6590e4f0ad2c9e8e10a0d85e",
    //     "name": "Akshay Ashok Solanke",
    //     "email": "akshayashoksolanke@gmail.com",
    //     "mobile": 8010248192,
    //     "password": "$2a$10$OJvmntipXpLqJ9Wv3kaiJugKWfiBR7I/Y7NHPrX6rWw.sxMjrDWBi",
    //     "avatar": "http://res.cloudinary.com/dhlyinfwd/image/upload/v1705047174/Profile/6590e4f0ad2c9e8e10a0d85e.jpg",
    //     "role": "student",
    //     "__v": 0,
    //     "dob": "2004-02-12",
    //     "gender": "Male",
    //     "stream": "Bsc Cs (Computer science)",
    //     "address": {
    //         "_id": "65a0f525c57f95fb9495e159",
    //         "address": "Green Ville charoli phata.",
    //         "state": "Maharashtra",
    //         "city": "Pune",
    //         "pincode": 412105,
    //         "__v": 0
    //     }
    // }
    if (isLoading) return <LoadingSpinner />
    if (!data) return <Link href={"/students"} className='my-2 inline-block'><AppButton type='button'>Go Back </AppButton></Link>
    
    return (
        <div>
            <Link href={"/students"} className='my-2 inline-block'><AppButton type='button' >Go Back </AppButton></Link>
            <div className="flex justify-between">
                <div className="w-full lg:w-[49%] bg-white p-4 border shadow-sm">
                    <h6 className='text-xl font-semibold mb-2'>Account Info</h6>
                    <div className="flex flex-wrap space-y-2">
                        <div className="w-full lg:w-[48%]">
                            <MyLabel required={true} label={"Name"} />
                            <p className='text-sm'>{data.name}</p>
                        </div>
                        <div className="w-full lg:w-[48%]">
                            <MyLabel required={true} label={"Mobile"} />
                            <p className='text-sm'>{data.mobile}</p>
                        </div>
                        <div className="w-full lg:w-[48%]">
                            <MyLabel required={true} label={"Email"} />
                            <p className='text-sm'>{data.email}</p>
                        </div>
                        <div className="w-full lg:w-[48%]">
                            <MyLabel required={true} label={"Gender"} />
                            <p className='text-sm'>{data.gender}</p>
                        </div>
                        <div className="w-full lg:w-[48%]">
                            <MyLabel required={true} label={"Stream"} />
                            <p className='text-sm'>{data.stream}</p>
                        </div>
                        <div className="w-full lg:w-[48%]">
                            <MyLabel required={true} label={"DOB"} />
                            <p className='text-sm'>{data.dob}</p>
                        </div>
                        {data?.avatar && <div className="w-full lg:w-[48%]">
                            <MyLabel required={true} label={"Profile"} />
                            <div className='w-8 h-8 relative my-1 lg:m-0 '><Image src={data.avatar} alt='Avatar' layout='fill' />
                            </div>
                        </div>}
                    </div>
                </div>
                <div className="w-full lg:w-[49%] bg-white p-4 border shadow-sm">
                    <h6 className='text-xl font-semibold mb-2'>Address Info</h6>
                    <div className="flex flex-wrap space-y-2">
                        <div className="w-full lg:w-[48%]">
                            <MyLabel required={true} label={"Address "} />
                            <p className='text-sm'>{data?.address?.address || "NA"}</p>
                        </div>
                        <div className="w-full lg:w-[48%]">
                            <MyLabel required={true} label={"State "} />
                            <p className='text-sm'>{data?.address?.state || "NA"}</p>
                        </div>
                        <div className="w-full lg:w-[48%]">
                            <MyLabel required={true} label={"City "} />
                            <p className='text-sm'>{data?.address?.city || "NA"}</p>
                        </div>
                        <div className="w-full lg:w-[48%]">
                            <MyLabel required={true} label={"Pincode "} />
                            <p className='text-sm'>{data?.address?.pincode || "NA"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo