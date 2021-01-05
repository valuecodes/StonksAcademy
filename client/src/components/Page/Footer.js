import React from 'react'
import './Page.css'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className='footer'>
            <div className='container'>
                <div></div>
                <div className='trademark'>
                    Stonks Academy 2020 ® 
                </div>
                <div className='footerLinks'>
                    <Link to='/disclaimer'>Disclaimer</Link>
                    <Link to='/privacy-policy'>Privacy Policy</Link>
                    <Link to='/terms-of-service'>Terms Of Service</Link>
                </div>                
            </div> 
        </footer>
    )
}
