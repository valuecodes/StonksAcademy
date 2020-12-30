import React from 'react'
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { InfoTooltip } from './Tooltip'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    tooltip:{
        marginLeft:'auto',
        color:'var(--secondary-color)'
    }
}));

export default function Statement({statement={}}) {
    const classes = useStyles();
    return (
        <Card className='padding'>
            <ul className='statementContent'>
                <li>
                    <h2>{statement.statement}</h2>
                    <b className='statementCompany'>{statement.company}</b>
                </li>
                <li>
                    <p className='statementDate'>{statement.info}</p>
                    <p className='statementDate'>{statement.date.value}</p>
                    {statement.date.info&&
                        <InfoTooltip className={classes.tooltip} text={statement.date.info}/>
                    }
                    
                </li>
                {statement.content.map((item,index) =>
                    item.header?<SubHeader key={index} item={item}/>:
                    item.name?<Content key={index} item={item}/>:
                    <div key={index}></div>    
                )}
            </ul>
        </Card>
    )
}

function Content({item}){
    const classes = useStyles();
    return <li>
        <p>{item.name}</p>
        {item.value&& <p>{item.value}</p>}
        {item.info?<InfoTooltip className={classes.tooltip} text={item.info}/>:<div className='statementPlaceHolder'></div>}
    </li>
}

function SubHeader({item}){
    return <li className='statementSubHeader'><b>{item.header}</b></li>
}