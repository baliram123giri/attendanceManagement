"use client"
import Image from 'next/image'
import React from 'react'

const UserAvtar = ({ name, avatar }) => {
    var capitalizedFirstName = name?.split(" ")[0]?.charAt(0)?.toUpperCase();

    // Check if there is a last name before accessing it
    var capitalizedLastName = name?.split(" ")?.length > 1
        ? name?.split(" ")[1]?.charAt(0)?.toUpperCase()
        : "";

    var capitalizedFullName = capitalizedFirstName + capitalizedLastName;

    if (avatar) {
        return <Image src={avatar} alt={name} layout='fill' />
    } else {
        return (
            <h6>{capitalizedFullName}</h6>
        )
    }

}

export default UserAvtar