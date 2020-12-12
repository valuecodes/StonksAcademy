import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function SectionHeader({header,subHeader,back}) {

    const resetArticlesHandler = async () => {
        await axios.delete('/api/article')
    }

    return (
        <header className='screenHeader'>
            <h1>{header}</h1>
            {back&& <BackButton linkTo={back} />} 
            <h2>{subHeader}</h2>
            <button onClick={resetArticlesHandler}>Reset user articles</button>
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