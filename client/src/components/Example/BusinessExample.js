import React from 'react'
import './Example.css'
import Card from '@material-ui/core/Card';
import MaterialIcon from '../Other/MaterialIcon'
import TextField from '@material-ui/core/TextField';

export default function BusinessExample() {
    return (
        <div>
            
        </div>
    )
}


export function BusinessCard({header,value,icon,onChange,name,step}){
    return(
        <Card className='businessExampleCard'>
            <h2>{header}</h2>
            <TextField
                id="standard-number"
                label=""
                type="number"
                inputProps={{step:step,min:step===1?1:0}}
                className='businessExampleCardInput'
                value={value}
                onChange={onChange&&((e,value)=>onChange(e,e.target.value,name))}
                name={name}
            />
            <MaterialIcon icon={icon} className='businessCardIcon'/>
        </Card>
    )
}