import Image from 'next/image'
import React from 'react'

const SuccessUploaded = () => {
    return (
        <div>
            <div className="grid place-content-center bg-white px-4">
                <div className="text-center">
                    <Image src={'/verified.gif'} alt='success' width={200} height={200} />

                    <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Done!</h1>

                    <p className="mt-4 text-gray-500">File uploaded successfully.</p>
                </div>
            </div>
        </div>
    )
}

export default SuccessUploaded