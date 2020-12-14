import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import { camelCaseToString, formatNumber } from '../../utils/utils';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  root: {
    // width: 300,
    padding:10,
    paddingBottom:0,
    // height:'auto',
    // overflow:'auto'
  },
  InputGroup:{
      display:'grid',
      gridTemplateColumns:'auto 10rem',
  },
  value:{
      marginLeft:'1rem'
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function InputGroup({header,inputs,setInputs}) {
    const classes = useStyles();

    const changeValueHandler = (event, value,name) =>{
        if(inputs[name].value!==value){
            setInputs({...inputs,[name]:{...inputs[name],value}})
        }
    }

    return (
        <Card className={classes.root}>
            
        <h2>{header}</h2>
        {Object.keys(inputs).map(input=>
                inputs[input].type==='slider'?
                    <SliderInput key={input} input={input} inputs={inputs} changeValueHandler={changeValueHandler}/>:
                    inputs[input].type==='switch'?
                    <SwitchInput key={input} input={input} inputs={inputs} changeValueHandler={changeValueHandler}/>:
                    <></>         
        )}
        </Card>
    )
}

function SwitchInput({input,inputs,changeValueHandler}){
    return(
        <>
            <Typography id="discrete-slider" gutterBottom>
                {camelCaseToString(input)}
            </Typography>
            <Checkbox
                checked={inputs[input].value}
                name={input}
                id={input}
                color="primary"
                onChange={(event, value) => changeValueHandler('slider', value,input)}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </>
    )
}

function SliderInput({input,inputs,changeValueHandler}){

    const classes = useStyles();

    return(
        <div className={classes.InputGroup}>
            <Typography id="discrete-slider" gutterBottom>
                {camelCaseToString(input)}
            </Typography>
            <div></div>
            <Slider
                defaultValue={30}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={inputs[input].step||1}
                marks
                min={inputs[input].min||0}
                max={inputs[input].max||100}  
                name={input}
                id={input}
                className={classes.slider}
                value={inputs[input].value}
                onChange={(event, value) => changeValueHandler('slider', value,input)}   
            />    
            <h3 className={classes.value}>
                {formatNumber(inputs[input].value,inputs[input].format)}
            </h3>                         
        </div>
    )
}