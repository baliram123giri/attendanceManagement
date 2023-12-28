"use client"
import React from 'react'
import Avatar from 'react-avatar'
const UserAvtar = ({ name, avatar, color }) => {
    return (
        <Avatar size='30'  round {...(avatar ? { src: avatar } : { name, color })} />
    )
}

export default UserAvtar