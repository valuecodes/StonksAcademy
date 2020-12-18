import React from 'react'
import Slider from '@material-ui/core/Slider';

export function InputSlider(props) {

    const { 
        min=0, 
        max=100, 
        step=1, 
        onChange,
        value=0,
        name=''
    } = props

    return (
        <Slider
        value={+value.toFixed(1)} 
        aria-labelledby="discrete-slider"
        // valueLabelDisplay="auto"
        step={step}
        // marks
        min={min}
        max={max}
        onChange={onChange&&((e,value)=>onChange(e,value,name))} 
    />
    )
}
