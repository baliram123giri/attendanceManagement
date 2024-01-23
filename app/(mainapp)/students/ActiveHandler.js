import React from 'react'

const ActiveHandler = ({ isActive }) => {
    return (
        <div><span className={`${isActive ? "text-main-app-error" : "text-main-app-secondary"} font-semibold`}>{isActive ? "Active" : "InActive"}</span></div>
    )
}

export default ActiveHandler