import { SignInButton } from '@clerk/clerk-react'
import React from 'react'

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <h1 className='text-5xl font-extrabold text-gray-800 mb-6 text-center'>
                Sign in to <span className="text-blue-500">Meme Generator</span>
            </h1>
            <SignInButton
                mode='modal'
                forceRedirectUrl="/home"
                className='px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600'
            />
        </div>
    )
}

export default Home
