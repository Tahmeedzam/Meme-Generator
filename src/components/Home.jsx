import { SignInButton } from '@clerk/clerk-react'
import React from 'react'

const Home = () => {
    return (
        <div>
            <h1 className='text-4xl font-bold'>Sign in now</h1>
            <SignInButton
                mode='modal'
                forceRedirectUrl="/home"
                className='btn rounded-3xl border-2 border-black' />
        </div>
    )
}

export default Home 