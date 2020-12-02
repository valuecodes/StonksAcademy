import React from 'react'

export default function TrainingStatus({text='46%'}) {
    return (
        <div className='trainingStatus'>
            <h3>Completed</h3>
            <div>{text}</div>
        </div>
    )
}
