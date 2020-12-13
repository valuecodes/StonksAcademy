import React from 'react'
import Card from '@material-ui/core/Card';

export default function ResultCard({header,value}) {
    return (
        <Card className='card'>
            <h2>{header}</h2>
            <div 

                className='resultBig'
            >
                {value}
            </div>
        </Card>
    )
}
