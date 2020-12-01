import React from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as Logo} from '../images/Logo.svg'

export default function Header() {
    return (
        <header className='header'>
            <div className='container'>
                <Link className='mainLogo' to='/'><Logo/></Link>
                <Navigation/>                
            </div>
        </header>
    )
}

function Navigation(){
    return(
        <nav className='mainNav'>
            <ul >
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/academy'>Academy</Link></li>
                <li><Link to='/simulator'>Simulator</Link></li>
            </ul>  
        </nav>
    )
}

