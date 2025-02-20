import React from 'react'
import '../App.css'
import Header from './Header'
import Hero from './Hero'

function FullPage() {
    return (
        <div>
            <div className='h-screen bg-amber-100'>
                <div className='flex flex-col items-center pt-0 sm:pt-0 md:pt-10 mt-auto'>
                    <Header />
                    <Hero />
                </div>
            </div>
        </div>
    )
}

export default FullPage