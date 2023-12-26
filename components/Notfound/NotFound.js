import Image from 'next/image'
import React from 'react'

const NotFound = ({ image, title }) => {
    return (
        <div className="flex flex-col items-center justify-center ">
            <Image
                width={400}
                height={400}
                src={image} // Replace with your image URL
                alt={title}
            />
            <p className="text-lg font-bold">{title}</p>
        </div>
    )
}

export default NotFound