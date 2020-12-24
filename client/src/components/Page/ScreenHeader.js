import React from 'react'
import { Link } from 'react-router-dom'

export default function ScreenHeader({header,subHeader,back}) {
    return (
        <header className='screenHeader'>
            <h1>{header}</h1>
            {back&& <BackButton linkTo={back} />} 
            <h2>{subHeader}</h2>
        </header>
    )
}

function BackButton({linkTo}){
    return(
        <Link to={linkTo} className='backButton'>
            Back
        </Link>
    )
}