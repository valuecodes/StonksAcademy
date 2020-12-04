import React from 'react'

export default function TrainingStatus({header='Completed', text='46%'}) {
    return (
        <div className='trainingStatus'>
            <h3>{header}</h3>
            <div>{text}</div>
        </div>
    )
}
