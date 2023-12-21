import React from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const AppButton = ({ children, type = "submit", isLoading, color = "warning" }) => {
    return (
        <button disabled={isLoading} className={`text-[12px] ${color === "warning" ? "bg-main-app-secondary " : color} py-2 px-2 text-white rounded-sm`} type={type}>{isLoading ? <LoadingSpinner /> : children}</button>
    )
}

export default AppButton