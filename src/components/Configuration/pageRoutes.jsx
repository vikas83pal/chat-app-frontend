import React from 'react'
import { Routes, Route } from 'react-router'
import App from '../../App.jsx';
import About from "../chatApp/about.jsx"
import Contact from "../chatApp/contact.jsx"
import ChatPage from '../chatApp/chatPage.jsx';




const pageRoutes = () => {
    return (
        <>

            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/*" element={<h1>404 | Page Not Found</h1>} />
                <Route path="/chatpage" element={<ChatPage />} />
            </Routes>
        </>
    )
}

export default pageRoutes