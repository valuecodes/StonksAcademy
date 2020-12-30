import React from 'react'
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tooltip:{
        fontSize:20,
    },
    text:{
        fontSize:12,
        padding:'0.5rem',
        lineHeight:'1.4rem',
        whiteSpace: 'pre-wrap'
    }
  }));

export function InfoTooltip({text,className=''}) {

    const classes = useStyles();

    return (
        <Tooltip  
            className={`${classes.tooltip} ${className}`} 
            title={<p className={classes.text}>{text}</p>} 
            placement="bottom-start"
            enterTouchDelay={500}
        >
            <InfoIcon  />
        </Tooltip>
    )
}
