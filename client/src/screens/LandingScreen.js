import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingScreen() {
    return (
        <section className='landingScreen'>
            <div className='landingPageContainer'>
                <Link to='/academy'>Academy</Link> 
                <Link to='/simulator'>Simulator</Link> 
            </div>
        </section>
    )
}
