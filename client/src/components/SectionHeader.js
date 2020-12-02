import React from 'react'
import TrainingStatus from './TrainingStatus'

export default function SectionHeader({header}) {
    return (
        <header className='sectionHeader'>
            <h1>{header}</h1>
            <TrainingStatus/>
        </header>
    )
}
