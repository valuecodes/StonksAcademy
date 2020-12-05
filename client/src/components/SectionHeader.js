import React from 'react'
import TrainingStatus from './TrainingStatus'
import { Link } from 'react-router-dom'

export default function SectionHeader({header,subHeader,back}) {
    return (
        <header className='sectionHeader'>
            <h1>{header}</h1>
            {back&& <BackButton linkTo={back} />} 
            <h2>{subHeader}</h2>
            <TrainingStatus/>
        </header>
    )
}

function BackButton({linkTo}){
    return(
        <Link to={linkTo} className='backButton'>
            Back
            {/* <MaterialIcon icon={'ArrowBackIosIcon'} color={'var(--primary-color)'}/> */}
        </Link>
    )
}