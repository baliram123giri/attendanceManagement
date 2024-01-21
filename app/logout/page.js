"use client"
import { signOut } from 'next-auth/react'

import React, { useEffect } from 'react'

const Logout = () => {

    useEffect(() => {
        async function logoutSession() {
            try {
                await signOut()
                // Handle success if needed
            } catch (error) {
                // Handle error if needed
                console.error('Logout failed', error)
            }
        }
        logoutSession()
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg md:w-1/2 lg:w-1/3 xl:w-1/4">
                <h1 className="text-3xl font-bold mb-4">Logout</h1>
                <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Logout
