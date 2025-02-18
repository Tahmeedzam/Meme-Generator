import React from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'

function App() {
    return (
        <div className='h-screen bg-amber-100'>
            <div className='flex flex-col items-center pt-0 sm:pt-0 md:pt-10 mt-auto'>
                <Header />
                <Hero />
            </div>
        </div>


    )
}

export default App