import React from 'react';
import memeLogo from '../assets/images/meme-logo.png';
import "./Header.css"

function Header() {
    return (
        <nav className='flex nav-bar h-20  w-300 place-content-between p-5 rounded-t-xl'>
            <div className='flex items-center pl-5'>
                <img alt='Meme logo' src={memeLogo} className='h-10 w-auto text-white '></img>
                <h1 className='text-white text-md md:text-xl lg:text-3xl font-medium'>Meme Generator</h1>
            </div>
            <div className='flex items-center'>
                <p className='text-white text-xs md:text-lg'>React Course - Project 3</p>
            </div>

        </nav>
    )
}

export default Header