"use client"
import InfiniteLoader from '@/components/LoadingSpinner/InfiniteLoader';
import { myAxios } from '@/utils/utils';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import { useEffect } from 'react';

const ActivateAccountError = ({ token }) => {
    const { mutate, isSuccess, isLoading, error, data } = useMutation(async () => {
        const { data } = await myAxios.post(`/user/activate`, { token })
        return data
    })

    useEffect(() => { mutate() }, [mutate])

    if (isLoading) return <div className='flex flex-col items-center'><InfiniteLoader /> <span className='text-xs text-main-app-primary font-semibold'>Waiting for Activation...</span></div>

    if (isSuccess) return <div className="success-page text-center bg-white p-6 rounded-md shadow-md max-w-md mx-auto mt-10">
        <h1 className="text-green-500 text-2xl font-bold mb-4">{data?.message}!</h1>
        <p className="text-gray-700 mb-4">You can now log in and enjoy our services.</p>
        <Link href="/login" className="text-blue-500  hover:text-blue-700">
            Go to Home
        </Link>
    </div>
    if (error) {
        return (
            <div className="error-page text-center bg-white p-6 rounded-md shadow-md max-w-[95%] lg:max-w-[50%] mx-auto mt-10">
                <h1 className="text-red-500 text-2xl font-bold mb-4">Account Activation Error</h1>
                <p className="text-gray-700 mb-4">
                    Sorry, we encountered an issue while activating your account.
                </p>
                <p className="text-gray-700 mb-4">
                    Please try again later or contact our support team for assistance.
                </p>
                <Link href="/login" className="text-blue-500  hover:text-blue-700">
                    Go to Home
                </Link>
            </div>
        );
    }
    return null
};

export default ActivateAccountError;
