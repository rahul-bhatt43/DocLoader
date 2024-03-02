import React from 'react'

const ProgressBar = ({ progressState = 0 }) => {
    return (
        <div>
            <div className=' bg-gray-400 w-full p-1 mt-3 rounded-full ' >
                <div className=' p-1 bg-primary rounded-full ' style={{ width: `${progressState}%` }} >
                </div>
            </div>
            {`${Number(progressState).toFixed(0)}%`}
        </div>
    )
}

export default ProgressBar