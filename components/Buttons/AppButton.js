import React from 'react'

const AppButton = ({ children, type = "submit" }) => {
    return (
        <button className={`text-[12px] bg-main-app-secondary py-2 px-2 text-white rounded-sm`} type={type}>{children}</button>
    )
}

export default AppButton