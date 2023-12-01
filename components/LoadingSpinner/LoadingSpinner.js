
import React from 'react';
const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white-500"></div>
            <span className='text-xs inline-block ms-1'>Loading</span>
        </div>
    );
};

export default LoadingSpinner;