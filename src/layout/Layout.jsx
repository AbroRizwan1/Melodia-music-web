import React from 'react'
import Navbar from '../Component/Navbar'
import Footer from '../Component/Footer'
import Home from '../pages/Home'
import { useRef } from 'react'

const Layout = () => {

    const albumRef = useRef(null);
    const musicRef = useRef(null);


    function handleClick(section) {
        if (section === "Album") {
            albumRef.current?.scrollIntoView({ behavior: "smooth" });
        }

        if (section === "Track") {
            musicRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }


    return (
        <div>
            <Navbar handleClick={handleClick} />
            <Home albumRef={albumRef} musicRef={musicRef} />
            <Footer />
        </div>
    )
}

export default Layout
