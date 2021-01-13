import React from 'react'
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
const useStyles = makeStyles({
    root: {
      width: 250,
    },
    input: {
      width: 42,
      fontSize:30,
      marginLeft:'5rem'
    },
    sliderInput:{
        display:'grid',
        gridTemplateColumns:'1fr auto auto',
        fontSize:20,
        alignItems:'flex-end'
    },
  });

export function InputSlider(props) {

    const { 
        min=0, 
        max=100, 
        step=1, 
        onChange,
        value=0,
        name='',
        className=''
    } = props

    return (
        <Slider
        className={className}
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
