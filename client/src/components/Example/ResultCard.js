import React from 'react'
import Card from '@material-ui/core/Card';
import { InfoTooltip } from '../Other/Tooltip';

export default function ResultCard({header,value,color='',tooltip=false}) {
    return (
        <Card className='card' style={{backgroundColor:color}}>
            <h2>{header} {tooltip && <InfoTooltip text={tooltip}/>} </h2> 
            <div className='resultBig'>
                {value}
            </div>
        </Card>
    )
}
