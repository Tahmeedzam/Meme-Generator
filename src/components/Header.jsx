import React from 'react'
import "./Header.css"
import memeLogo from "../assets/images/meme-logo.png"
import { UserButton } from '@clerk/clerk-react'

function Header() {
    return (
        <nav className='nav-bar flex flex-wrap items-center justify-between h-20 w-full max-w-6xl p-3 sm:p-5 rounded-t-lg bg-blue-500 mx-auto'>
            <div className='flex items-center gap-2 sm:gap-4 overflow-hidden'>
                <img alt='Meme logo' src={memeLogo} className='h-8 sm:h-10 w-auto' />
                <h1 className='text-white text-sm sm:text-xl lg:text-3xl font-medium truncate'>Meme Generator</h1>
            </div>
            <div className='flex items-center'>
                <p className='text-white text-xs sm:text-lg text-right pr-4 sm:block' >React Course - Project 3</p>
                <UserButton />
            </div>
        </nav>
    )
}

export default Header