import React from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const AppButton = ({ children, type = "submit", isLoading, color = "warning", className, onClick }) => {
    return (
        <button onClick={onClick} disabled={isLoading} className={`text-[12px] ${className || "rounded-sm"} ${color === "warning" ? "bg-main-app-secondary " : color} py-2 px-2 text-white `} type={type}>{isLoading ? <LoadingSpinner /> : children}</button>
    )
}

export default AppButton