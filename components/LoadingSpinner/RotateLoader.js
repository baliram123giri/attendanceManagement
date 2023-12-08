
import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

const RotateLoader = ({ width = 40, color = "#583D72" }) => {
    return (
        <RotatingLines
            strokeColor={color}
            strokeWidth="5"
            animationDuration="0.75"
            width={width}
            visible={true}
        />
    )
}

export default RotateLoader