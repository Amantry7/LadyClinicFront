import React from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'

const Public = ({ children }: any) => {
    return (
        <div>
            <Nav />
            {children}
            <Footer />
        </div>
    )
}

export default Public
