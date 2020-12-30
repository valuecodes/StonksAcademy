import React from 'react'
import MaterialIcon from './MaterialIcon';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
        margin:'0!important',
        fontSize:16,
        fontWeight:'semi-bold',
    },
    icon:{
        height:25,
        width:25,
        marginLeft:'auto',
        marginRight:10,
    }
}));

export function AccordionLight({list}) {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            {list.map((item,index) =>
                <Accordion key={index} className={classes.accordion}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.accordionHeading}
                    >
                            <Typography className={classes.heading}>{item.header}</Typography>
                            <MaterialIcon className={classes.icon}  icon={item.icon}/>                         
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        {item.text}
                    </Typography>
                    </AccordionDetails>
                </Accordion>                
            )}
        </div>
    )
}
