"use client"
import { signOut } from 'next-auth/react'
import Link from 'next/link'
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
        <div>
            <Link href={"/login"}><button className='p-2 bg-main-app-secondary'> Go To Login</button></Link>
        </div>
    )
}

export default Logout
