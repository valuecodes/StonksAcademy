import React from 'react'
import { Link } from 'react-router-dom'
import image from '../images/world.svg'

export default function LandingScreen(props) {

    return (
        <section className='landingScreen'>
            <div className='landingPageContainer'>
                <div className='landingPageButtons'>
                    <Link to='/academy'>Academy</Link> 
                </div>
                <div  className='bgImageContainer'>
                    <img className='bgImage' src={image} alt={'World Map'}/>
                </div>
            </div>
        </section>
    )
}

