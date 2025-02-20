import React from 'react'
import './App.css'
import Home from './components/Home';
import FullPage from './components/FullPage';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route index element={<Home />} />
            <Route path='/home' element={<>
                <SignedIn>
                    <FullPage />
                </SignedIn>

                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </>} />
        </>
    )
)

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App